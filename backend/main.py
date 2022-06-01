from typing import Union
from fastapi import FastAPI, File, UploadFile
import random
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
from skimage import color
import gc
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as T
from PIL import Image
import torchvision.transforms.functional as TF
import aiofiles
import subprocess
import os
import io
from starlette.responses import StreamingResponse,FileResponse
import sys
from cv2 import cv2
from torchvision.utils import save_image


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

def rgb2hsv(img):
    img_original = img.numpy().transpose((1, 2, 0))
    img_hsv = color.rgb2hsv(img_original)
    img_hs = img_hsv[:, :, 0:2]
    img_hs = torch.from_numpy(img_hs.transpose((2, 0, 1))).float()
    img_v = img_hsv[:, :, 2]
    img_v = torch.from_numpy(img_v).float().unsqueeze(0)
    img_gray = color.rgb2gray(img_original)
    img_gray = torch.from_numpy(img_gray).unsqueeze(0).float()
    return img_gray, img_hs, img_v

def hsv2rgb(v, h, s):
    img_hsv = torch.stack([h, s, v])
    img_rgb = color.hsv2rgb(img_hsv.cpu().detach().numpy().transpose((1, 2, 0)))
    img_rgb = torch.from_numpy(img_rgb.transpose((2, 0, 1))).float()
    return img_rgb


def rgb2lab(img):
    img_original = img.numpy().transpose((1, 2, 0))
    img_lab = color.rgb2lab(img_original)
    img_lab = (img_lab + 128) / 255
    img_ab = img_lab[:, :, 1:3]
    img_ab = torch.from_numpy(img_ab.transpose((2, 0, 1))).float()
    img_l = img_lab[:, :, 0]
    img_l = torch.from_numpy(img_l).float().unsqueeze(0)
    img_gray = color.rgb2gray(img_original)
    img_gray = torch.from_numpy(img_gray).unsqueeze(0).float()
    return img_gray, img_ab, img_l

def lab2rgb(l, a, b):
    img_lab = torch.stack([l, a, b])
    img_lab = img_lab * 255 - 128
    img_rgb = color.lab2rgb(img_lab.cpu().detach().numpy().transpose((1, 2, 0)))
    img_rgb = torch.from_numpy(img_rgb.transpose((2, 0, 1))).float()
    return img_rgb

convert_fn = rgb2lab
revert_fn = lab2rgb

app = FastAPI()

class ExtractorResnet152(nn.Module):
    def __init__(self):
        super(ExtractorResnet152, self).__init__()
        model = torchvision.models.resnet152()
        model.conv1.weight = nn.Parameter(model.conv1.weight.sum(dim=1).unsqueeze(1))
        self.layers = nn.Sequential(
            *list(model.children())[0:6]
        )

    def forward(self, x):
        x = self.layers(x)
        return x

# auto encoder decoder based on Resnet18
class ColorNetResnet18(nn.Module):

    def __init__(self, mid_input_size=0):
        super(ColorNetResnet18, self).__init__()
        self.mid_input_size = mid_input_size
        resnet = torchvision.models.resnet18()
        resnet.conv1.weight = nn.Parameter(resnet.conv1.weight.sum(dim=1).unsqueeze(1))
        self.encoder = nn.Sequential(*list(resnet.children())[0:6])
        self.decoder = nn.Sequential(     
            nn.Conv2d(mid_input_size + 128, 128, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.Upsample(scale_factor=2),
            nn.Conv2d(128, 64, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.Upsample(scale_factor=2),
            nn.Conv2d(64, 32, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.Conv2d(32, 2, kernel_size=3, stride=1, padding=1),
            nn.Upsample(scale_factor=2)
        )

    def forward(self, x, in_=None):
        x = self.encoder(x)
        if self.mid_input_size > 0:
            x = torch.cat([x, in_], dim=1)
        x = self.decoder(x)
        return x

models = {
    "resnet18": ColorNetResnet18
}
extractors = {
    "resnet152": ExtractorResnet152
}
model_name = "resnet18"
extractor = ExtractorResnet152()
model = models[model_name](mid_input_size=extractor(torch.zeros((1, 1, 256, 256))).shape[1])
model.load_state_dict(torch.load('../models/resnet18_lab_2022-05-22_15:43:40:003835.pth'))
extractor.to(device)
model.to(device)

def compose (image):
    return T.Compose([
        T.Resize((256, 256)),
        T.ToTensor()
    ])(image)

def get_image(path):
    return Image.open(path)

@app.post("/color/")
async def read_root(file: UploadFile = File(...)):
    try:
        command = '''ls imgs | grep -P "(.)*_col_(.)*" | awk '{print "./imgs/"$1}' | xargs -d "\n" rm'''
        results = subprocess.run(command, shell=True, universal_newlines=True, check=True)
        print(results)

        contents = await file.read()
        filename = os.path.abspath("./imgs/" + file.filename)
        with open(filename, 'wb') as f:
            with torch.no_grad():
                f.write(contents)
                img = compose(get_image(filename)) 
                converted = convert_fn(img)
                gray_img = torch.stack([converted[0]]).to(device) 
                global_features = extractor(gray_img).to(device)
                color_outputs = model(gray_img, global_features)
                cpu_color = color_outputs.cpu()
                newFilename =  "".join(filename.split(".")[:-1]) + "_col_" + '.png'
                reverted = revert_fn(converted[2][0], cpu_color[0][0], cpu_color[0][1]) 
                save_image(reverted, newFilename)
                return FileResponse(newFilename)
                # return StreamingResponse(image_to_byte_array(T.ToPILImage()(reverted)), media_type="image/png")
                # res, im_png = cv2.imencode(".png", reverted.cpu().numpy())
                # return StreamingResponse(io.BytesIO(im_png.tobytes()), media_type="image/png")
    except Exception as e:
        print(e)
        return {"message": "There was an error uploading the file"}
    finally:
        await file.close()

@app.post("/gray_scale/")
async def gray_scale(file: UploadFile = File(...)):
    try:
        # command = '''ls imgs | grep -P "(.)*_col_(.)*" | awk '{print "./imgs/"$1}' | xargs -d "\n" rm'''
        # results = subprocess.run(command, shell=True, universal_newlines=True, check=True)
        # print(results)

        contents = await file.read()
        filename = os.path.abspath("./imgs/" + file.filename)
        with open(filename, 'wb') as f:
            f.write(contents)
            f.close()
        with torch.no_grad():
            img = compose(get_image(filename)) 
            converted = img
            gray_img = torch.stack([converted[0]]).to(device) 
            global_features = extractor(gray_img).to(device)
            color_outputs = model(gray_img, global_features)
            cpu_color = color_outputs.cpu()
            newFilename =  "".join(filename.split(".")[:-1]) + "_col_" + '.png'
            reverted = revert_fn(converted[2][0], cpu_color[0][0], cpu_color[0][1]) 
            save_image(reverted, newFilename)
            return FileResponse(newFilename)
    except Exception as e:
        print(e)
        return {"message": "There was an error uploading the file"}
    finally:
        await file.close()

@app.get('/about')
def show_about():

    def bash(command):
        output = os.popen(command).read()
        return output

    return {
        "sys.version": sys.version,
        "torch.__version__": torch.__version__,
        "torch.cuda.is_available()": torch.cuda.is_available(),
        "torch.version.cuda": torch.version.cuda,
        "torch.backends.cudnn.version()": torch.backends.cudnn.version(),
        "torch.backends.cudnn.enabled": torch.backends.cudnn.enabled,
        "nvidia-smi": bash('nvidia-smi')
    }
    