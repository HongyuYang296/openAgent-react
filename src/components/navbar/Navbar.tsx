import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/image/logo.png';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuitems = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Contact',
      path: '/contact'
    },
    {
      title: 'ContactList',
      path: '/contactList'
    }
  ];

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', color: 'black' }}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
          <a href="/">
            <img
              src={logo} // Replace with your actual logo path
              alt="Logo"
              style={{ height: '90px', objectFit: 'contain' }} // Adjust height as needed
            />
          </a>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {menuitems.map((item, index) => (
            <Button href={item.path} key={index} sx={{ color: 'black' }}>
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ color: 'black' }} // Ensure the icon is also black
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {menuitems.map((item, index) => (
            <MenuItem onClick={handleMenuClose} key={index}>
              <a href={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.title}
              </a>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
