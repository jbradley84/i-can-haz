import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

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
      // Execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
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
      sx={{
        height: "80vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          pt: 10,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ICON & TITLE */}
        <Avatar sx={{ mt: 0, mb: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>

        {/* FORM INPUT FIELDS */}
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 4 }}
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

          {/* SIGN UP FAILED DYNAMIC ERROR */}
          <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
            <Grid item>
              {error && <Typography color="error">Sign up failed</Typography>}
            </Grid>
          </Grid>

          {/* SUBMIT BUTTON */}
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
            Sign Up
          </Button>

          {/* ALREADY HAVE ACCT THEN LOGIN LINK */}
          <Grid
            container
            justifyContent="flex-end"
            sx={{ position: "relative" }}
          >
            <Grid item>
              <Link to="/login" variant="a">
                <Typography sx={{ color: "secondary.dark" }}>
                  Already have an account? Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
