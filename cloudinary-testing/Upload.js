import React, {useState} from "react";

export default function Upload() {
    return(
        <div>
            <h2>Image Upload</h2>
            <form>
                <input type="file" name="image" className="form-input"></input>
                <button className="btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
