import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const AccountSettings = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await updateUser({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", my: 12 }}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card elevation={4}>
        <CardHeader
          subheader="Update your account information"
          title="Profile"
          sx={{ my: 1 }}
        />
        <Divider />
        <CardContent
          sx={{
            pt: 10,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Grid
            sx={{ display: "flex",  flexDirection: "column", justifyContent: "center" }}
            container
            spacing={3}
          >
            <Box
              // item
              // md={12}
              // xs={12}
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
            >
              <Grid container spacing={2} >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label="Email Address"
                    name="email"
                    type="email"
                    id="email"
                    helperText="required"
                    value={formState.email}
                    onChange={handleChange}
                    sx={{ ml: 1.5 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label="Password"
                    name="password"
                    type="password"
                    id="password"
                    helperText="required"
                    value={formState.password}
                    onChange={handleChange}
                    sx={{ ml: 1.5, mb: 2 }}
                  />
                </Grid>
              </Grid>


              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  py: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ my: 1 }}
                >
                  Save details
                </Button>
              </Grid>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AccountSettings;
