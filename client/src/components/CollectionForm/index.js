import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COLLECTION } from "../../utils/mutations";
import { QUERY_COLLECTIONS } from "../../utils/queries";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CollectionForm = () => {
  const { data } = useQuery(QUERY_COLLECTIONS);

  //TEST GRABBING COLLECTIONS
  // const queryTest = (e) => {
  //   e.preventDefault();
  //   const collections = data?.collections || [];
  //   console.log(collections);
  //   console.log(collections[0]._id);
  // };
  //END TEST

  const [formState, setFormState] = useState({
    collectionName: "",
    collectionDescription: "",
  });

  const [addCollection, { error }] = useMutation(ADD_COLLECTION);

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
    const collections = data?.collections || [];
    try {
      const { data } = await addCollection({
        variables: { ...formState },
      });

      console.log(data);
      console.log(collections[0]._id);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <Container
      component={Paper}
      elevation={6}
      square
      maxWidth="sm"
      sx={{ height: "80vh", display: "flex", alignItems: "center" }}
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
          The world's best place for showing off your stuff
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
                autoFocus
                color="secondary"
                name="collectionName"
                type="collectionName"
                id="collectionName"
                value={formState.collectionName}
                label="Collection Name"
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
                color="secondary"
                name="collectionDescription"
                type="collectionDescription"
                id="collectionDescription"
                value={formState.collectionDescription}
                label="Description"
                helperText="required"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* ADD COLLECTION FAILED ERROR **NOT WORKING** (Let's me submit with empty fields)*/}
          <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
            <Grid item>
              {error && (
                <Typography color="error">
                  You need to be logged in!
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* ADD NEW COLLECTION BUTTON */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            Add New Collection
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionForm;
