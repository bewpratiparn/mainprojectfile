import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Adjust based on your project's color
    },
    background: {
      default: "#f4f6f8", // Light gray background
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(','),
  },
});
