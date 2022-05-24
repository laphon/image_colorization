from typing import Union
from fastapi import FastAPI
import random
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
from skimage import color
import gc
import datetime
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as T

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")


app = FastAPI()


@app.post("/files/")
async def read_root(file: bytes = File()):
    return {"Hello": "World"}

    