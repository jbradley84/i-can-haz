import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      variant="elevation"
      sx={{ backgroundColor: "#D62246", border: "none", mb: 3 }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters sx={{ py: 2.5 }}>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "ROBOTO",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            I CAN HAZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"
                   sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button>
                    <Link to="/profile">
                      <Typography sx={{ color: "black" }}>Profile</Typography>
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/">
                      <Typography sx={{ color: "black" }}>
                        Collections
                      </Typography>
                    </Link>
                  </Button>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              padding: .5,
              display: { xs: "flex", md: "none" },
              flexGrow: 8,
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            I CAN HAZ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button>
              <Link to="/profile">
                <Typography sx={{ color: "white" }}>Profile</Typography>
              </Link>
            </Button>
            <Button>
              <Link to="/">
                <Typography sx={{ color: "white" }}>Collections</Typography>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexShrink: 1 }}>

            <Button variant="contained" sx={{ backgroundColor: "white", p: .2, mr: 1 }}>
              <Link to="/login">
                <Typography sx={{ color: "black" }}>Login</Typography>
              </Link>
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "white", py: .2, px: 1, ml: 1 }}>
              <Link to="/signup">
                <Typography sx={{ color: "black" }}>Sign Up</Typography>
              </Link>
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              ))
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
