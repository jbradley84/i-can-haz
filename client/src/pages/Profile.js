import React from "react";
import CollectionList from "../components/CollectionList";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";

const Profile = () => {
  // const { loading, data } = useQuery(QUERY_COLLECTIONS);

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam, user: QUERY_ME },
  });

  const user = data?.me || data?.user || {};
  const collections = data?.collections || [];

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(userParam)
  console.log(collections)
  console.log(data)

  return (
    <Container>
      <Box>
        <Grid container>
          <Grid item>
            <Avatar
              className="avatar"
              sx={{
                mr: 4,
                width: { xs: 50, sm: 70, md: 100, lg: 120 },
                height: { xs: 50, sm: 70, md: 100, lg: 120 },
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
            <Typography variant="h4" sx={{}}>
              {userParam
                ? `${userParam}'s Profile`
                : `Welcome back, ${user.username}!`}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <div>
        <div>
          <CollectionList
            collections={user.collections}
            title={`${userParam}'s collections...`}
          />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
