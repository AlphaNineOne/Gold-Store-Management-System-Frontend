import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';

// COMONENTS & STYLES
import { mainBoxStyles, mainWrapperStyles } from 'styles/mui/layout-styles';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

function PrivateLayoutWrapper() {
  return (
    <Box>
      <Topbar />

      <Box className="d-flex align-items-start" sx={mainWrapperStyles}>
        <Sidebar />

        <Box sx={mainBoxStyles}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default PrivateLayoutWrapper;
