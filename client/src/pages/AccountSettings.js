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
  TextField
} from '@mui/material';


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
    try {
      const { data } = await updateUser({
        variables: { ...formState }
      });
    
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", my: 12 }}
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
        <CardContent>
          <Grid sx={{ display: "flex", justifyContent: "center" }}
            container
            spacing={3}
          >
          <Grid
              item
              md={12}
              xs={12}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    color="secondary"
                    label="Username"
                    name="username"
                    type="username"
                    id="username"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    label="Email Address"
                    name="email"
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
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
                    value={formState.password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ my: 1 }}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </Container>
  );
};


export default AccountSettings;