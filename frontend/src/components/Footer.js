//
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.black,
    background: theme.palette.common.black,
    color: theme.palette.common.black,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  mainContainer: {
    position: "absolute",
    backgroundColor: "#26A541",
  },
  link: {
    color: "darkgray",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  gridItem: {
    margin: "3em",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      {/* <Hidden mdDown> */}
      <Grid container justify="center" className={classes.mainContainer}>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(0)}
              to="/"
              className={classes.link}
            >
              <span style={{ color: "white" }}>Home</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(3)}
              to="/about"
              className={classes.link}
            >
              <span style={{ color: "white" }}>About Us</span>
            </Grid>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(3)}
              to="/about"
              className={classes.link}
            >
              <span style={{ color: "white" }}>History</span>
            </Grid>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(3)}
              to="/about"
              className={classes.link}
            >
              <span style={{ color: "white" }}>Team</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.gridItem}>
          <Grid container direction="column" spacing={2}>
            <Grid
              item
              component={Link}
              onClick={() => props.setValue(4)}
              to="/contact"
              className={classes.link}
            >
              <span style={{ color: "white" }}>Contact Us</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}
