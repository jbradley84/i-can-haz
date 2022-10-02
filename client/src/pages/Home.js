import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTIONS } from "../utils/queries";
import CollectionList from "../components/CollectionList";
import Container from "@mui/material/Container";
import { Typography, Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_COLLECTIONS);
  const collections = data?.collections || [];
  console.log(collections);

  return (
    <main>
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Box>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Collections
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Ipsa reiciendis velit in enim porro. Voluptatem, sapiente dolor!
                </Typography>
                <Stack
                  sx={{ py: 2 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button variant="contained">
                    <Link to="/collectionForm" >
                      <Typography sx={{ color: "white" }}>Add A Collection</Typography>
                    </Link>
                  </Button>
                  <Link to="/profile">
                    <Button variant="outlined">
                      <Typography>View Profile</Typography>
                    </Button>
                  </Link>
                </Stack>
              </Container>
      
              <Container >
                <CollectionList collections={collections} title="COLLECTIONS" />
              </Container>
            </Box>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
