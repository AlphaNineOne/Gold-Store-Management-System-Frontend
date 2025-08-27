import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import { Link, useMatch } from 'react-router-dom';
import propTypes from 'prop-types';
import { getSidebarLinkStyles } from 'styles/mui/layout-styles';

function SidebarLink({ path, label, icon: Icon }) {
  const isActive = useMatch(path);
  const isSmallDevice = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Link to={path} className="clearLink">
      <Tooltip title={label} placement="right" disableHoverListener={!isSmallDevice}>
        <ListItemButton sx={getSidebarLinkStyles(isActive)}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>

          <ListItemText>{label}</ListItemText>
        </ListItemButton>
      </Tooltip>
    </Link>
  );
}

SidebarLink.propTypes = {
  path: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  icon: propTypes.object.isRequired,
};

export default SidebarLink;
