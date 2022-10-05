import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


// import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const ItemList = ({ items }) => {
  if (!items.length) {
    return <h3 className="no-item">No Items Yet</h3>;
  }
  

  return (
    <div className="contain">
      {items &&
        items.map((item) => (
          <Card
            className="card"
            key={item._id}
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
                  {item.itemName}
                </Typography>
                <div className="card-body">
                <Typography sx={{ mb: 1, fontSize: 20, fontWeight: "Bold" }}>
                  {item.itemDescription}
                </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </div>
  );
};

export default ItemList;