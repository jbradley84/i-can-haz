import React, { useState } from "react";
import Upload from "../Upload";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../../utils/mutations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/system/Container";
import Grid from "@mui/material/Grid";

const ItemForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formState, setFormState] = useState({
    itemName: "",
    itemImage: "",
    itemDescription: "",
  });

  const [addItem, { error }] = useMutation(ADD_ITEM);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Execute addUser mutation and pass in variable data from form
      const { data } = await addItem({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  //CLOUDINARY UPLOAD START
  //sets a state to capture the cloud URL to display the image later

  //function called when the upload button is pressed to create and open the upload widget
  const imageWidget = (e) => {
    e.preventDefault();
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
          setFormState({ ...formState, itemImage: result.info.url });
        }
      }
    );
    widget.open();
  };
  //CLOUDINARY UPLOAD END

  return (
    <Container sx={{ height: "80vh", alignItems: "center" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box component="form" noValidate sx={{ mt: 1, mb: 2 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item>
              <TextField
                required
                fullWidth
                name="itemName"
                type="itemName"
                id="itemName"
                value={formState.itemName}
                label="Title"
                helperText="required"
                onChange={handleChange}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                name="itemDescription"
                type="itemDescription"
                id="itemDescription"
                value={formState.itemDescription}
                label="Description"
                helperText="required"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item>
              {formState.itemImage !== "" ? (
                <img
                  width="200"
                  heingt="200"
                  src={formState.itemImage}
                  alt="preview"
                />
              ) : (
                <img
                  src="https://placekitten.com/g/200/200"
                  alt="placeholder"
                />
              )}
            </Grid>
            <Grid item>
              <Button
                sx={{
                  mt: 1,
                  mb: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                    color: "white",
                  },
                }}
                variant="contained"
                onClick={imageWidget}
              >
                Upload Image
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ItemForm;
