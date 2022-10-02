import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

// MATERIAL UI IMPORTS
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          my: 8.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ICON & TITLE */}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* FORM INPUT FIELDS */}
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                // autoFocus
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
              mt: 3,
              mb: 2,
              bgcolor: "primary.main",
              ":hover": {
                bgcolor: "secondary.main",
                color: "white",
              },
            }}
          >
            Sign Up
          </Button>

          {/* ALREADY HAVE ACCT THEN LOGIN LINK */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
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
