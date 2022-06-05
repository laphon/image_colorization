import tw from 'twin.macro'
import {useState} from 'react';

const UploadAndDisplayImage = ({setImage}: {setImage: (img: any) => void}) => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    return (
      <div>
        {selectedImage && (
          <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={()=>setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />
       
        <br /> 
        <input
          type="file"
          name="myImage"
          className="p-2 rounded-full text-gray-800"
          onChange={(event: any) => {
            if (!event || !event.target) {
               console.log("There is an error while uploading file") 
            }
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
            setImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };

  const Carousel = () => {
      return (
      <div tw="flex">
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=8B7BCDC2" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=500B67FB" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=A89D0DE6" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=225E6693" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=9D9539E7" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=BDC01094" className="rounded-box" />
        </div> 
        <div className="carousel-item w-1/2">
            <img src="https://api.lorem.space/image/game?w=256&h=400&hash=7F5AE56A" className="rounded-box" />
        </div>
    </div>
    )
  }


const Index = () => {
    const [curSelect, setCurSelect] = useState(-2);
    const [upload, setUpload] = useState<any>(null);

    return (
        <div className="grid grid-cols-10">
            <div className="col-span-9">
                <UploadAndDisplayImage setImage={(img: any) => {
                    setUpload(img);
                    setCurSelect(-2);
                }}/>
            </div>
            <div className="col-span-1">
               <Carousel />
            </div> 
        </div>
        ) 
}

export default Index;