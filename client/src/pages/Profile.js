import React from "react";
import CollectionList from "../components/CollectionList";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = () => {
  // const { loading, data } = useQuery(QUERY_COLLECTIONS);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam, user: QUERY_ME },
  });

  const user = data?.me || data?.user || {};
  // const collections = data?.collections || [];

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(userParam);
  // console.log(collections);
  // console.log(data);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          wrap
          container
          component={Paper}
          elevation={3}
          maxWidth="sm"
          // className="profile-title"
          sx={{ borderRadius: 5, p: 2, mt: 3, mb: 2, mx: 2 }}
        >
          <Grid item>
            <Avatar
              sx={{
                mr: 4,
                width: { xs: 60, sm: 70, md: 100, lg: 120 },
                height: { xs: 60, sm: 70, md: 100, lg: 120 },
                bgcolor: "secondary.main",
              }}
            ></Avatar>
          </Grid>
          <Grid
            item
            sx={{
              my: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              {userParam
                ? `${userParam}'s Profile`
                : `Welcome back, ${user.username}!`}
            </Typography>
          </Grid>
        </Grid>
      </Box>


      <Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                ":hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <Link to="/AccountSettings">
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  Account Settings
                  <SettingsIcon sx={{ ml: 1, fontSize: 21 }}/>
                </Typography>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>


      <Box>
        <Typography
          variant="h4"
          marginTop={4}
          sx={{
            fontWeight: 300,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {userParam ? `${userParam}'s Collections` : `Your Collections`}
        </Typography>

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item>
            <Divider
              justify="center"
              sx={{ mb: 2, width: { xs: 300, sm: 500, md: 700 } }}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item>
            <CollectionList
              collections={user.collections}
              title={`${userParam}'s collections...`}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
