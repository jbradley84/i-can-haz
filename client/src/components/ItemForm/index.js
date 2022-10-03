import React from "react";
import Upload from "../Upload";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

const itemForm = () => {
  return (
    <FormControl>
      <Box>
        <TextField label="Title" helperText="required*"></TextField>

        <TextField label="Description" helperText="required*"></TextField>
      </Box>
    </FormControl>
  );
};

export default itemForm;
