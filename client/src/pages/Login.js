import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Grid container component="main" sx={{ height: "80vh" }}>
      <CssBaseline />

      {/* LEFT HALF WITH ANIMATION */}
      <Grid
        item
        align="center"
        className="area"
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          
          sx={{
            color: "white",
            fontFamily: "Pacifico",
            width: "75%"
          }}
        >
          You can have it all with
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 700,
            }}
          >
            I CAN HAZ.
          </Typography>
        </Typography>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Grid>

      {/* RIGHT HALF INCLUDING FORM */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 12,
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
            Login
          </Typography>

          {/* FORM INPUT FIELDS */}
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 1, mx: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleChange}
            />

            {/* SIGN UP FAILED DYNAMIC ERROR */}
            <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
              <Grid item>
                {error && <Typography color="error">Login failed</Typography>}
              </Grid>
            </Grid>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              fullWidth
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
              Login
            </Button>

            {/* DONT HAVE ACCT? THEN SIGN UP LINK */}

            <Grid
              container
              justifyContent="flex-end"
              sx={{ position: "relative" }}
            >
              <Grid item>
                <Typography sx={{ color: "secondary.dark" }}>
                  <Link to="/signup" variant="a">
                    Don't have an account? Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
