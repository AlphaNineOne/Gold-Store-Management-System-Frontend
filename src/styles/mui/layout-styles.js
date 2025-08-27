import { primary, primaryDark, secondary } from 'styles/colors';

const sidebarWidth = '250px';
const sidedarCollapsedWidth = '56px';
const appbarHeight = '64px';

export const getSidebarLinkStyles = isActive => ({
  background: isActive ? primary : 'white',

  '&:hover': {
    background: isActive ? primaryDark : 'rgba(0, 0, 0, 0.04)',
  },

  '& .MuiListItemIcon-root': {
    color: isActive ? secondary : 'grey',
  },

  '& .MuiTypography-root': {
    color: isActive ? secondary : 'grey',
  },

  '@media screen and (max-width: 768px)': {
    '& .MuiTypography-root': {
      display: 'none',
    },
  },
});

export const appbarStyles = {
  backgroundColor: 'white',

  '& .MuiTypography-root': {
    color: primary,
  },
};

export const mainWrapperStyles = {
  marginTop: appbarHeight,
};

export const mainBoxStyles = {
  width: `calc(100% - ${sidebarWidth})`,
  background: '#F5F5FB',
  minHeight: '600px',
  height: `calc(100vh - ${appbarHeight})`,
  maxHeight: '100vh',
  overflowY: 'auto',
  padding: '20px',

  '@media screen and (max-width: 768px)': {
    width: `calc(100% - ${sidedarCollapsedWidth})`,
  },
};

export const sidebarStyles = {
  width: sidebarWidth,
  padding: '20px 0',
  height: `calc(100vh - ${appbarHeight})`,
  overflowY: 'auto',
  borderRight: '1px solid lightgray',

  '@media screen and (max-width: 768px)': {
    width: sidedarCollapsedWidth,
  },
};
