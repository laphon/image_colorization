import tw, { css } from "twin.macro";
import { useEffect, useState } from "react";

const UploadAndDisplayImage = ({
  setImage,
}: {
  setImage: (img: any) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {/* {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )} */}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        tw="p-2 rounded-full text-gray-800"
        onChange={(event: any) => {
          if (!event || !event.target) {
            console.log("There is an error while uploading file");
          }
          console.log(event.target.files[0]);
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
        <div key={i} onClick={() => setCurSelect(i)}>
          <Image src={url} selected={i === curSelect} />
        </div>
      ))}
    </div>
  );
};

const DEFAULT_URLS = [
  "https://api.lorem.space/image/game?w=256&h=400&hash=7F5AE56A",
  "https://api.lorem.space/image/game?w=256&h=400&hash=225E6693",
  "https://api.lorem.space/image/game?w=256&h=400&hash=8B7BCDC2",
  "https://api.lorem.space/image/game?w=256&h=400&hash=A89D0DE6",
  "https://api.lorem.space/image/game?w=256&h=400&hash=500B67FB",
];

const Index = () => {
  const [curSelect, setCurSelect] = useState(-2);
  const [upload, setUpload] = useState<any>(null);
  const [urls, setUrls] = useState(DEFAULT_URLS);

  useEffect(() => {
    if (upload) {
      //   console.log(URL.createObjectURL(upload));
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
          setCurSelect={setCurSelect}
        />
      </div>
    </div>
  );
};

export default Index;
