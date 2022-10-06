import * as React from "react";
import Auth from "../../utils/auth";


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
// import { styled } from '@mui/material/styles';

const btn = {
  py: 0.2,
  px: 0.8,
  m: 0.5,
  backgroundColor: "#ffffff",
  ":hover": {
    bgcolor: "secondary.light",
  },
};

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

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <AppBar
      position="static"
      variant="elevation"
      color="primary"
      sx={{ border: "none", mb: 3 }}
    >
      <Container maxWidth="xxl">
        <Toolbar disableGutters sx={{ py: 2.5 }}>
          <Link to="/">
            {/* I CAN HAZ on wide screen (ie. desktop) */}
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "ROBOTO",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              I CAN HAZ
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu options pop-up"
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
                <Typography
                  textAlign="center"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* ⬇︎ DROP DOWN MENU BTNS */}
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

                  <Button>
                    <Link to="/CollectionForm">
                      <Typography sx={{ color: "black" }}>
                        + Collection
                      </Typography>
                    </Link>
                  </Button>
                  {/* ⬆︎ DROP DOWN MENU BTNS  */}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 8, display: { xs: "flex", md: "none" } }}>
            <Link to="/">
              {/* I CAN HAZ on thin screen (ie. tablet/mobile) */}
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  padding: 0.5,
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                I CAN HAZ
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button>
              <Link to="/">
                <Typography sx={{ color: "white", fontSize: 18 }}>
                  Collections
                </Typography>
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexShrink: 1 }}>
            {Auth.loggedIn() ? (
              <>
                {/* ⬇︎ Buttons for LOGGED IN = TRUE 𛰧profile/logout𛰨 */}
                <Button variant="contained" sx={btn}>
                  <Link to="/profile">
                    <Typography sx={{ color: "black" }}>Profile</Typography>
                  </Link>
                </Button>

                <Button variant="contained" sx={btn}>
                  <Link to="/login" onClick={logout}>
                    <Typography sx={{ color: "black" }}>Logout</Typography>
                  </Link>
                </Button>
                {/* ⬆︎ Buttons for LOGGED IN = TRUE 𛰧profile/logout𛰨 */}
              </>
            ) : (
              <>
                {/* ⬇︎ Buttons for LOGGED IN = FALSE 𛰧login/signup𛰨 */}
                <Button variant="contained" sx={btn}>
                  <Link to="/login">
                    <Typography sx={{ color: "black" }}>Login</Typography>
                  </Link>
                </Button>
                <Button variant="contained" sx={btn}>
                  <Link to="/signup">
                    <Typography sx={{ color: "black" }}>Sign Up</Typography>
                  </Link>
                </Button>
                {/* ⬆︎ Buttons for LOGGED IN = FALSE 𛰧login/signup𛰨 */}
              </>
            )}

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
