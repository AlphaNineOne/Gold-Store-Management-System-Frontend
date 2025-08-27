import { createTheme } from '@mui/material';
import { primary, secondary } from './colors';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 991,
      xl: 1200,
    },
  },

  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },

  typography: {
    allVariants: {
      fontFamily: 'Roboto, sans-serif',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          textTransform: 'capitalize',
        },

        containedPrimary: {
          color: 'white',

          '&:hover': {
            color: 'white',
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: secondary,

          '& th': {
            color: 'white',
            whiteSpace: 'nowrap',
          },
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          '& tbody': {
            '& tr:last-child td': {
              borderBottom: 'none',
            },
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          overflow: 'auto',
          background: 'white',
        },
      },
    },
  },
});

export default theme;
