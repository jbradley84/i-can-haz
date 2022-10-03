
import React, { useState } from "react";

export default function Upload() {
  //sets a state to capture the cloud URL to display the image later
  const [imageUrl, setImageUrl] = useState("");

  //function called when the upload button is pressed to create and open the upload widget
  const imageWidget = () => {
    //the widget creation needs to be a seperate object within the function to not open immediately upon page load.
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dgbv72kqf",
        uploadPreset: "collectaur",
      },
      //all of the info returned when the image is uploaded is in the result.info object property
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.url);
          //sets the state image url by targeting the result.info property, but result.info has other useful info that can be captured as well.
          setImageUrl(result.info.url);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      {/* <img src={imageUrl} alt="upload preview"></img> */}
      <button id="upload_widget" className="cloudinary-button" onClick={imageWidget}>
        Upload Image
      </button>
    </div>
  );
}
