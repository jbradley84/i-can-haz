import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import placeholder from "../../assets/placeholder.jpeg"

// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const CollectionList = ({ collections }) => {
  if (!collections) {
    return <h3 className="no-collection">No Collections Yet</h3>;
  }

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
                  image={placeholder}
                  alt="lizard"
                />
                <CardContent sx={{ textAlign: "left", padding: 3 }}>
                  {/* SINGLE COLLECTION */}
                  <Typography sx={{ mb: 1, fontSize: 20, fontWeight: "Bold" }}>
                    <Link
                      to={`/collection/${collection._id}`}
                      style={{ fontWeight: 500, color: "white" }}
                    >
                      {collection.collectionName}
                    </Link>{" "}
                  </Typography>
                  
                  {/* USER PROFILE */}
                  <Typography>
                    <Link
                      to={`/profile/${collection.username}`}
                      style={{ fontWeight: 700, color: "white" }}
                      className="text-light"
                    >
                      {collection.username}
                    </Link>{" "}
                  </Typography>

                  <div className="card-body">
                    <p>{collection.collectionText}</p>
                    <p className="mb-0">
                      Comments: {collection.commentCount} | Click to{" "}
                      {collection.commentCount ? "see" : "start"} the
                      discussion!
                    </p>
                  </div>
                </CardContent>
             
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
};

export default CollectionList;
