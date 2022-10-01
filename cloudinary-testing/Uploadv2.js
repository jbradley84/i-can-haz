

import React, {useState} from "react";
import {Image} from "cloudinary-react";
import Axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";

const App = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [preveiwSrc, setPreviewSrc] = useState('');

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "collectaur");
        console.log(formData);

        Axios.post("https://api.cloudinary.com/v1_1/dgbv72kqf/image/upload", formData)
        .then((response) => {
            console.log(response);
        });
    };

    // const imagePreview = (selectedImage) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(selectedImage);
    //     reader.onloadend = () => {
    //         setPreviewSrc(reader.result);
    //     }
    // };

    // const handleImageInputChange = (e) => {
    //     const imageFile = e.target.files[0];
    //     setSelectedImage(imageFile);
    //     imagePreview(imageFile);
    //     console.log(imageFile);
    //     console.log(selectedImage);

    // };


    return(
        <div>
            <form>
                <input type="file" onChange={(e) => {setSelectedImage(e.target.files[0])}}></input>
                <button onClick={uploadImage}>Upload Image</button>
            </form>
            {preveiwSrc && (
                <img src={preveiwSrc} alt="preview" ></img>
                )}
        <Image cloudName="dgbv72kqf" public_id="https://res.cloudinary.com/dgbv72kqf/image/upload/v1664328544/cld-sample-5.jpg"/>
        </div>
    )
};

export default App;