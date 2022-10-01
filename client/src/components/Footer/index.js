import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
        The Collect-taurs&nbsp; 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box position="static"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          flexShrink: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="xxl">
          <Typography variant="body1" sx={{ color: "#D62246" }}>
              I Can Haz
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}