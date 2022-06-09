import React from "react";
import background from "../landscape-black-mountains-monochrome-water-nature-876204-wallhere.com.jpg";
import "twin.macro";

const Title = () => (
  <div
    style={{
      backgroundImage: `url(${background})`,
      backgroundPosition: "50% 75%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      opacity: "0.9",
    }}
    tw="flex w-full pt-24 pb-60 bg-red-200 inline mb-16"
  >
    <h1 tw="text-center text-5xl font-semibold">Deep Image Colorizer</h1>
  </div>
);

export default Title;
