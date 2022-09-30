import React, {useState} from "react";
import Image from "cloudinary-react";
import Axios from "axios";

const App = () => {
    const [selectedImage, setSelectedImage] = useState('');
    const [preveiwSrc, setPreviewSrc] = useState('');

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "collectaur");

        Axios.post("https://api.cloudinary.com/v1_1/dgbv72kqf/image/upload", formData)
        .then((response) => {
            console.log(response);
        })
    };

    const imagePreview = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
    };

    const handleImageInputChange = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile);
        imagePreview(imageFile);

    };


    return(
        <div>
            <form>
                <input type="file" onChange={handleImageInputChange}></input>
                <button onClick={uploadImage}></button>
            </form>
            {preveiwSrc && (
                <img src={preveiwSrc} alt="preview" ></img>
                )}
        </div>
    )
};

export default App;