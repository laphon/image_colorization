import Selector from "./Selector";
import { useEffect, useState } from "react";
import { HOST_NAME } from "../../constant";
import tw from "twin.macro";
import Loading from "../Loading";

const colorImgApi = async (img: File, setDestImg: (img: File) => void) => {
  try {
    console.log("img", img);
    const data = new FormData();
    data.append("file", img);
    const ob = await fetch(`${HOST_NAME}/gray_scale`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    });
    const blob = await ob.blob();
    const file = new File([blob], "file.png", {
      type: blob.type,
    });
    setDestImg(file);
  } catch (err) {
    console.log(err);
  }
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <div tw="flex justify-center" onClick={onClick}>
      <button tw="text-lg bg-pink-400 text-white py-2 px-4 border rounded-md font-semibold">
        {text}
      </button>
    </div>
  );
};

const Image = ({ url }: { url: string }) => {
  return (
    <img
      css={[tw`border`, tw`rounded-xl`, tw`w-72 h-48 object-cover`]}
      src={url}
    />
  );
};

const BothImage = ({ src, dest }: { src: string; dest: string }) => {
  if (src == "" || dest == "") {
    return null;
  }

  return (
    <div tw="flex justify-center">
      <div tw="flex justify-between w-3/5 items-center">
        <div>
          <Image url={src} />
          <h2 tw="text-center text-lg font-semibold">Original</h2>
        </div>
        <div>
          <Image url={dest} />
          <h2 tw="text-center text-lg font-semibold">Colorized</h2>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [srcDat, setSrcDat] = useState<File>();
  const [destImg, setDestImg] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  let srcUrl = "";
  let destUrl = "";

  if (destImg && srcDat) {
    srcUrl = URL.createObjectURL(srcDat);
    destUrl = URL.createObjectURL(destImg);
  }

  return (
    <section>
      <div tw="space-y-4 my-4">
        <BothImage src={srcUrl} dest={destUrl} />
        <div tw="flex justify-center">{isLoading && <Loading />}</div>
        <Selector
          callApi={(url) => {
            setSrcDat(url);
          }}
        />
        <Button
          text={"Colorize!"}
          onClick={async () => {
            setIsLoading(true);
            if (srcDat) {
              await colorImgApi(srcDat, setDestImg);
            }
            setIsLoading(false);
          }}
        />
      </div>
    </section>
  );
};

export default Index;
