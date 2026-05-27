import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#ff9800", // Orange
      contrastText: "#000000",
    },
    secondary: {
      main: "#ff5722", // Deep Orange
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212", // Dark gray
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for a friendlier look
  },
  typography: {
    fontFamily: [
      '"Prompt"',
      '"Inter"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(255, 152, 0, 0.3)',
          }
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '4px 0px 20px rgba(0,0,0,0.5)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.5)',
        }
      }
    }
  }
});
