import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COLLECTION } from "../../utils/mutations";

import { QUERY_COLLECTIONS, QUERY_ME } from "../../utils/queries";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/system/Container";
import Grid from "@mui/material/Grid";

const CollectionForm = () => {
  const { loading, data } = useQuery(QUERY_COLLECTIONS);
  //test grabbing collections
  const queryTest = (e) => {
    e.preventDefault();
    const collections = data?.collections || [];
    console.log(collections);
    console.log(collections[0]._id);
    //end test
  };
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
    try {
      const { data } = await addCollection({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: "80vh", alignItems: "center" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          component="form"
          onSubmit={queryTest}
          noValidate
          sx={{ mt: 1, mb: 2 }}
        >
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item>
              <TextField
                required
                fullWidth
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
                name="collectionDescription"
                type="collectionDescription"
                id="collectionDescription"
                value={formState.collectionDescription}
                label="Description"
                helperText="required"
                onChange={handleChange}
              ></TextField>
            </Grid>
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
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CollectionForm;