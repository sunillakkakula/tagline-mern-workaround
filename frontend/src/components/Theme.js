import { createMuiTheme } from "@material-ui/core/styles";

const nlGreen = "#26A541";
const nlMeroon = "#800000";
const nlGray = "#868686";
const nlBlack = "#000000";

export default createMuiTheme({
  palette: {
    common: {
      blue: nlGreen,
      orange: nlMeroon,
    },
    primary: {
      main: nlGreen,
    },
    secondary: {
      main: nlMeroon,
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: "2.5rem",
      color: nlGreen,
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: "2.0rem",
      color: nlGreen,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: "Roboto",
      fontSize: "1.75rem",
      color: nlGreen,
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Roboto",
      color: nlGreen,
    },
    subtitle1: {
      fontSize: "0.80rem",
      fontWeight: 500,
      color: nlGray,
      fontFamily: "Roboto",
    },
    productTitle: {
      fontSize: "0.80rem",
      fontWeight: 300,
      color: nlGray,
      fontFamily: "Roboto",
    },
    subtitle2: {
      color: "white",
      fontWeight: 300,
      fontSize: "1rem",
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "0.85rem",
      color: nlBlack,
      fontWeight: 500,
      fontFamily: "Roboto",
      textTransform: "capitalize",
      textAlign: "left",
    },
    body2: {
      fontSize: "0.80rem",
      color: nlGray,
      fontWeight: 300,
      fontFamily: "Roboto",
      textTransform: "capitalize",
      textAlign: "left",
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: nlGray,
      fontFamily: "Roboto",
    },
    learnButton: {
      borderColor: nlGreen,
      borderWidth: 2,
      textTransform: "none",
      color: nlGreen,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiRadio: {
      root: {
        color: "green",
      },
      colorSecondary: {
        "&$checked": {
          color: "green",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: nlGreen,
        fontSize: "1rem",
        fontFamily: "Roboto",
      },
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: nlGray,
          fontSize: "0.75rem",
          fontWeight: 400,
          fontFamily: "Roboto",
        },
        color: "gray",
        fontSize: "0.85rem",
        fontWeight: 500,
        fontFamily: "Roboto", // if you also want to change the color of the input, this is the prop you'd use
      },
      root: {
        color: nlGray,
        fontWeight: 300,
        fontFamily: "Roboto",
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${nlGreen}`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${nlGreen}`,
        },
      },
    },
  },
});
