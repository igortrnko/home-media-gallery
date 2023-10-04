import { createTheme } from "@mui/material/styles";
import { deepPurple, lightBlue } from "@mui/material/colors";
import { roboto } from "./font";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple["500"],
    },
    secondary: {
      main: lightBlue["A400"],
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  // components: {
  //   MuiAlert: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         ...(ownerState.severity === "info" && {
  //           backgroundColor: "#60a5fa",
  //         }),
  //       }),
  //     },
  //   },
  // },
});

export default theme;
