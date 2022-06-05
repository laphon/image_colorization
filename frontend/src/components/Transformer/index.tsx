import Selector from "./Selector";
import { useEffect, useState } from "react";
import { HOST_NAME } from "../../constant";
import tw from "twin.macro";

const colorImgApi = async (img: File) => {
  try {
    console.log("img", img);
    const data = new FormData();
    data.append("file", img);
    fetch(`${HOST_NAME}/gray_scale`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        console.log("res", response);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {}
};

const Button = ({ text }: { text: string }) => {
  return (
    <div tw="flex justify-center">
      <button tw="text-lg bg-pink-400 text-yellow-200 p-2 border-black border rounded-md font-semibold">
        {text}
      </button>
    </div>
  );
};

const BothImage = ({ src, dest }: { src: string; dest: string }) => {
  return (
    <div tw="flex justify-center">
      <img src={src} />
      <img src={dest} />
    </div>
  );
};

const Index = () => {
  const [srcDat, setSrcDat] = useState<File>();
  const [destImg, setDestImg] = useState<File>();

  let srcUrl = "";
  let destUrl = "";

  if (srcDat) {
    srcUrl = URL.createObjectURL(srcDat);
  }

  if (destImg) {
    destUrl = URL.createObjectURL(destImg);
  }

  useEffect(() => {
    if (srcDat) {
      colorImgApi(srcDat);
    }
  }, [srcDat]);

  return (
    <section>
      <div>
        <BothImage src={srcUrl} dest={destUrl} />
        <Selector callApi={(url) => setSrcDat(url)} />
        <Button text={"Colorize!"} />
      </div>
    </section>
  );
};

export default Index;
