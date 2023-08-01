import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { blueGrey } from '@mui/material/colors';


const userId=localStorage.getItem("currentUser");
const pages = [
  { label: 'Home', path: '/' },
  { label: 'User', path: `/user/${userId}` },
  { label: 'Blog', path: '/post' }
];
const authPages = [
  { label: 'Login', path: '/auth' },
  { label: 'Register', path: `register` }
];
const settingPages = [
  { label: 'Profile', path: '/' },
  { label: 'User', path: `/user/${userId}` },
  { label: 'Logout', path: '/logout'}
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
   
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  


  return (
    <AppBar position="static" sx={{background:'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to={page.path}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
             
          {localStorage.getItem("currentUser") != null ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ bgcolor: blueGrey.A700 }}
                aria-label="recipe"
                >
                    {localStorage.getItem("userName").charAt(0).toUpperCase()}
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingPages.map((settingPage) => (
                <MenuItem key={settingPage.label} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"
                   sx={{
                    textDecoration: 'none',
                    color: 'black', 
                  }}
                   component={Link} to={settingPage.path}>{settingPage.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> :  
           <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}
         >
           {authPages.map((authPage) => (
             <MenuItem key={authPage.label} onClick={handleCloseNavMenu}>
              <Button
                key={authPage.label}
                onClick={handleCloseNavMenu}
                component={Link}
                to={authPage.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {authPage.label}
              </Button>
               {/* <Typography textAlign="center"  sx={{
                    textDecoration: 'none',
                    color: 'black', 
                  }} component={Link} to={authPage.path}>{authPage.label}</Typography> */}
             </MenuItem>
           ))}
         </Box>}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
