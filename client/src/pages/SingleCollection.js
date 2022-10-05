import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

import { SINGLE_COLLECTION  } from "../utils/queries";
import { Box, Container, Grid, Typography } from "@mui/material";

const SingleCollection = () => {
  const { _id: idParam } = useParams();
  const { loading, data } = useQuery(SINGLE_COLLECTION, {
    variables: { _id: idParam}
  });
  const collection = data?.collection || {};
  const items = data?.collection.items || [];
  console.log(items);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Box>
        <Grid container sx={{ ml: 2, mt: 4, mb: 2 }}>
          <Grid item>
            <Typography variant="h2">
              {collection.collectionName}
            </Typography>
            <Typography variant="h6">Created By {collection.username}</Typography>
            <Typography>
              {collection.collectionDescription}
            </Typography>
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
      <ItemForm collectionID={collection._id}></ItemForm>
      
    </Container>
  );
};

export default SingleCollection;
