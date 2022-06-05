import Selector from "./Selector";
import { useState } from "react";
import { HOST_NAME } from "../../constant";

const colorImgApi = (img: File) => {
  try {
    console.log(img);
    const data = new FormData();
    data.append("file", img);
    // data.append("name", newItem.name);
    fetch(`${HOST_NAME}/gray_scale`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {}
};

const Index = () => {
  const [imgDat, setImgDat] = useState<File>();

  return <Selector imgUrl={imgDat} callApi={(url) => colorImgApi(url)} />;
};

export default Index;
