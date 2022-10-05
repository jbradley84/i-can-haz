import React from "react";
import ItemList from "../components/ItemList";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTIONS, SINGLE_COLLECTION  } from "../utils/queries";
import Auth from "../utils/auth";
import { Avatar, Box, Container, Grid } from "@mui/material";

const SingleCollection = () => {
  // const { loading, data } = useQuery(QUERY_COLLECTIONS);

  const { _id: idParam } = useParams();
  
  const { loading, data } = useQuery(SINGLE_COLLECTION, {
    variables: { _id: idParam}
  });
  
  const collection = data?.collection || {};
  const items = data?.items || [];
  console.log(items);

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === idParam) {
    return <Navigate to="/collection" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(userParam)
  // console.log(user.collections)
  // console.log(data.me)

  return (
    <Container>
      <Box>
        <Grid container>
          <Grid item>
            <Avatar sx={{ mr: 4, width: 70, height: 70, bgcolor: "secondary.main" }}></Avatar>
          </Grid>
          <Grid item>
            <h2>
              {collection.collectionName}
            </h2>
            <p>
              {collection.collectionDescription}
            </p>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container sx={{display: "flex", justifyContent: "center" }}>
          <Grid item>
            <ItemList items={items}></ItemList>
          </Grid>
        </Grid>  
      </Box>

      <div>
        <div>
          <ItemList
            items={items}
            //title={`${userParam}'s collections...`}
          />
        </div>
      </div>
    </Container>
  );
};

export default SingleCollection;
