import React, {useState} from "react";

export default function Upload() {

    const [imageInputState, setimageInputState] = useState('');
    const handleImageInputChange = (e) => {
        const image = e.target.images[0];
    }

    return(
        <div>
            <h2>Upload Image</h2>
            <form>
                <input type="file" name="image" onChange={handleImageInputChange} value ={imageInputState} className="form-input"></input>
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
