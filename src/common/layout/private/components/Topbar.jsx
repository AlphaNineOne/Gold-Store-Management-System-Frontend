import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

// STYLES & ASSETS
import logo from 'assets/logo.png';
import { appbarStyles } from 'styles/mui/layout-styles';
import { onLogout } from 'store/slices/authSlice';
import { Link } from 'react-router-dom';

function Topbar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(onLogout());
    handleClose();
  };

  return (
    <Box className="flex-grow-1">
      <AppBar position="fixed" sx={appbarStyles}>
        <Toolbar className="justify-content-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: '60px' }}>
              <img className="img-fluid" src={logo} alt="Logo" />
            </Box>
            <Typography variant="h6">Sarfaraz Jewellers</Typography>
          </Stack>

          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>

        <MenuItem onClick={handleClose}>
          <Link className="clearLink" to="/reset-password">
            Reset Password
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Topbar;
