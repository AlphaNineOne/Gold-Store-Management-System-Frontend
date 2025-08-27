import React from 'react';
import { Box, List } from '@mui/material';
import { AccountBalanceOutlined, AssessmentOutlined } from '@mui/icons-material';

// COMPONENTS & STYLES
import { sidebarStyles } from 'styles/mui/layout-styles';
import SidebarLink from './SidebarLink';

function Sidebar() {
  return (
    <Box sx={sidebarStyles} className="d-flex flex-column align-items-center gap-4">
      <List className="w-100">
        <SidebarLink path="/" label="Main Khata" icon={AccountBalanceOutlined} />
        <SidebarLink path="/reports" label="Reports" icon={AssessmentOutlined} />
      </List>
    </Box>
  );
}

export default Sidebar;
