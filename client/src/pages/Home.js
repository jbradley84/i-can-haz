import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COLLECTIONS } from "../utils/queries";
import CollectionList from "../components/CollectionList";
import Container from "@mui/material/Container";

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
            <Container>
              <CollectionList collections={collections} title="COLLECTIONS" />
            </Container> 
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
