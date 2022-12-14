import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../../utils/mutations";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ItemForm = ({ collectionID }) => {
  const [formState, setFormState] = useState({
    collectionId: collectionID,
    itemName: "",
    itemImage: "",
    itemDescription: "",
  });
  console.log();
  const [addItem, { error }] = useMutation(ADD_ITEM);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(formState);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addItem({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      collectionId: collectionID,
      itemName: "",
      itemImage: "",
      itemDescription: "",
    });
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
          setFormState({ ...formState, itemImage: result.info.url });
        }
      }
    );
    widget.open();
  };
  //CLOUDINARY UPLOAD END

  return (
    <Container
      component={Paper}
      elevation={6}
      square
      maxWidth="md"
      sx={{ height: "80vh", display: "flex", alignItems: "center", mt: 8, pt: 6 }}
    >
      <CssBaseline />
      <Box
        sx={{
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ICON & TITLE */}
        <AddCircleOutlineIcon
          sx={{ mb: 2, fontSize: "50px", color: "secondary.main" }}
        />
        <Typography
          component="p"
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          fontWeight="300"
        >
          Add a New Item
        </Typography>

        {/* FORM INPUT FIELDS */}
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{ mt: 3, mb: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
          
            <Grid item xs={6}  sx={{ display: "flex", alignItems: "center" }}>
              {formState.itemImage !== "" ? (
                <img
                  width="200"
                  height="200"
                  src={formState.itemImage}
                  alt="preview"
                  sx={{ ml: 3 }}
                />
              ) : (
                <img
                  src="https://placekitten.com/g/200/200"
                  alt="placeholder"
                />
              )}
            </Grid>

            {/* <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
              <Grid item>
                {error && (
                  <Typography color="error">Failed to add item</Typography>
                )}
              </Grid>
            </Grid> */}

            <Grid item xs={6} sx={{ mt: 10,  display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
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
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  py: 2,
                  mt: 1,
                  mb: 2,
                  ":hover": {
                    bgcolor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Add New Item
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ItemForm;
