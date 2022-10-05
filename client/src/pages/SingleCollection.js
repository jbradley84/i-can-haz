import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ItemList from "../components/ItemList";
import ItemForm from "../components/ItemForm";

import { SINGLE_COLLECTION  } from "../utils/queries";
import { Box, Container, Grid } from "@mui/material";

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
    <Container>
      <Box>
        <Grid container>
          <Grid item>
            <h2>
              {collection.collectionName}
            </h2>
            <p>Created By {collection.username}</p>
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
      <ItemForm collectionID={collection._id}></ItemForm>
      
    </Container>
  );
};

export default SingleCollection;
