import tw, { css } from "twin.macro";
import { useEffect, useState } from "react";

const UploadAndDisplayImage = ({
  setImage,
}: {
  setImage: (img: any) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div tw="flex h-full justify-center items-center">
      <input
        type="file"
        name="myImage"
        tw="p-2 rounded-full text-gray-800 "
        onChange={(event: any) => {
          if (!event || !event.target) {
            console.log("There is an error while uploading file");
          }
          setSelectedImage(event.target.files[0]);
          setImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

const Image = ({ selected, src }: { selected: boolean; src: string }) => (
  <img
    css={[
      tw`border`,
      selected && tw`border-green-600 border-4`,
      tw`rounded-xl`,
      tw`w-72 h-48 object-cover`,
    ]}
    src={src}
  />
);

const Carousel = ({
  curSelect,
  urls,
  setCurSelect,
}: {
  curSelect: number;
  setCurSelect: (idx: number) => void;
  urls: string[];
}) => {
  return (
    <div tw="flex space-x-2">
      {urls.map((url, i) => (
        <div key={i} onClick={() => setCurSelect(i)} tw="flex items-center">
          <Image src={url} selected={i === curSelect} />
        </div>
      ))}
    </div>
  );
};

const DEFAULT_URLS = [
  "https://raw.githubusercontent.com/laphon/image_colorization/main/images/grays/0_00n2nQhl4-pWH59J.jpg",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/1_XVP8KD24MdJIfQnAbTrSsA.png?raw=true",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/CloudyGoldenGate_grayscale.jpg?raw=true",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/grayscale-photography-shooting.jpg?raw=true",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/id_Grayscale_vs_Black_White_vs_Monochrome_02.jpg?raw=true",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/id_Grayscale_vs_Black_White_vs_Monochrome_04.jpg?raw=true",
  "https://github.com/laphon/image_colorization/blob/main/images/grays/snowy-mountain-gray-srgb.jpg?raw=true",
];

const fetchToBlob = (url: string) => {
  return fetch(url);
};

const blobUrlToFile = (blobUrl: string): Promise<File> =>
  new Promise((resolve) => {
    fetch(blobUrl, {
      headers: {
        accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-language": "en,th-TH;q=0.9,th;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site",
      },
      referrer: "http://localhost:3000/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })
      .then((res) => {
        console.log("ress ", res);
        res
          .blob()
          .then((blob) => {
            const file = new File([blob], "file.extension", {
              type: blob.type,
            });
            resolve(file);
          })
          .catch(console.log);
      })
      .catch(console.log);
  });

const Index = ({ callApi }: { callApi: (data: File) => void }) => {
  const [curSelect, setCurSelect] = useState(-2);
  const [upload, setUpload] = useState<File>();
  const [urls, setUrls] = useState(DEFAULT_URLS);

  useEffect(() => {
    if (upload) {
      setUrls([URL.createObjectURL(upload), ...urls]);
    }
  }, [upload]);

  return (
    <div tw="grid grid-cols-10">
      <div tw="col-span-2">
        <UploadAndDisplayImage
          setImage={(img: any) => {
            setUpload(img);
            setCurSelect(-2);
          }}
        />
      </div>
      <div tw="col-span-8">
        <Carousel
          curSelect={curSelect}
          urls={urls}
          setCurSelect={async (idx: number) => {
            setCurSelect(idx);
            callApi(await blobUrlToFile(urls[idx]));
          }}
        />
      </div>
    </div>
  );
};

export default Index;
