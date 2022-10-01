import React, { Component } from "react";

class Upload extends Component {
  componentDidMount() {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dgbv72kqf",
        uploadPreset: "collectaur",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload Image
      </button>
    );
  }
}

export default Upload;
