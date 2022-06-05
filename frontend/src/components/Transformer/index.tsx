import tw from 'twin.macro'
import {useState} from 'react';

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    return (
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
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
          onChange={(event: any) => {
            if (!event || !event.target) {
               console.log("There is an error while uploading file") 
            }
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };


const Index = () => {


    return 
}

export default Index;