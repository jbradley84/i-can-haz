import React, {useState} from "react";

export default function Upload() {

    const [imageInputState, setimageInputState] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [preveiwSrc, setPreviewSrc] = useState('');

    const handleImageInputChange = (e) => {
        const image = e.target.images[0];
        imagePreview(image);

    };

    const imagePreview = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();
        if(!preveiwSrc) return;
        uploadImage(preveiwSrc);

    };

    const uploadImage = () => {

    }

    return(
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleImageSubmit}>
                <input type="file" name="image" onChange={handleImageInputChange} value ={imageInputState} className="upload-form-input"></input>
                <button className="btn" type="submit">Submit</button>
            </form>
            {preveiwSrc && (
                <img src={preveiwSrc} alt="image preview" ></img>
            )}
        </div>
    )
}
