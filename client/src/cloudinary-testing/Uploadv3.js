require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { React, useState } = require("react");

console.log(cloudinary.config().cloud_name);

const Upload = () => {
    const [selectedImage, setSelectedImage] = useState("");

    const uploadImage = () => {

      
        cloudinary.uploader.upload(selectedImage)
        .then((result) => {
            console.log("success!", JSON.stringify(result, null, 2));
        })
        .catch((error) => {
            console.log("error", JSON.stringify(error, null, 2));
        });
    }

  return (
    <div>
      <form>
        <input
          type="file"
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
          }}
        ></input>
        <button onClick={uploadImage}>Upload Image</button>
      </form>
      {/* {preveiwSrc && <img src={preveiwSrc} alt="preview"></img>} */}
      {/* <Image
        cloudName="dgbv72kqf"
        public_id="https://res.cloudinary.com/dgbv72kqf/image/upload/v1664328544/cld-sample-5.jpg"
      /> */}
    </div>
  );
};

module.exports = Upload;