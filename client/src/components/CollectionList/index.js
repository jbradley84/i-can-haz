import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const CollectionList = ({ collections }) => {
  // if (!collections.length) {
  //   return <h3>No Collections Yet</h3>;
  // }
  

  return (
    <div className="contain">
      {collections &&
        collections.map((collection) => (
          <Card
            className="card"
            key={collection._id}
            sx={{
              my: 2,
              mx: 2,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 1,
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="175"
                // GET URLS FROM CLOUDINARY
                image="placeholder.jpeg"
                alt="lizard"
              />
              <CardContent sx={{ textAlign: "left", padding: 3 }}>
                <Typography sx={{ mb: 1, fontSize: 20, fontWeight: "Bold" }}>
                  {collection.collectionName}
                </Typography>
                <Typography>
                  Created by&nbsp;
                  <Link
                    to={`/profile/${collection.username}`}
                    style={{ fontWeight: 700, color: "white" }}
                    className="text-light"
                  >
                    {collection.username}
                  </Link>{" "}
                </Typography>
                <div className="card-body">
                  <Link
                    to={`/collection/${collection._id}`}
                    style={{ fontWeight: 500, color: "white" }}
                  >
                    <p>{collection.collectionText}</p>
                    <p className="mb-0">
                      Comments: {collection.commentCount} | Click to{" "}
                      {collection.commentCount ? "see" : "start"} the
                      discussion!
                    </p>
                  </Link>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
};

export default CollectionList;
