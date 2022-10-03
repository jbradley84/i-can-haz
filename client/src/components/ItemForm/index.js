import React, { useState } from "react";
import Upload from "../Upload";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../utils/mutations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/system/Container";

const ItemForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    imageUrl: imageUrl,
  });

  // const [addItem, { error }] = useMutation(ADD_ITEM);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       // Execute addUser mutation and pass in variable data from form
  //       const { data } = await addUser({
  //         variables: { ...formState },
  //       });
  //       console.log(data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  //CLOUDINARY UPLOAD START
  //sets a state to capture the cloud URL to display the image later

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
  //CLOUDINARY UPLOAD END

  return (
    <Container>
      <Box component="form" noValidate>
        <TextField
          required
          name="title"
          type="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
          label="Title"
          helperText="required*"
        ></TextField>

        <TextField
          required
          name="description"
          type="description"
          id="description"
          value={formState.description}
          label="Description"
          helperText="required*"
        ></TextField>
        <div>
          {/* <img src={imageUrl} alt="upload preview"></img> */}
          <button
            id="upload_widget"
            className="cloudinary-button"
            onClick={imageWidget}
          >
            Upload Image
          </button>
        </div>
      </Box>
    </Container>
  );
};

export default ItemForm;
