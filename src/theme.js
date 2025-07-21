import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#11b67a",
      contrastText: "#fff"
    },
    success: {
      main: "#11b67a",
      contrastText: "#fff"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary"
      }
    }
  }
});

export default theme;