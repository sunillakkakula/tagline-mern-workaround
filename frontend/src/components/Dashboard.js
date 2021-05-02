import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import Writeup from "../components/Writeup";
import { Link, useHistory } from "react-router-dom";
import BestSellingProducts from "../components/BestSellingProducts";
import OurProducts from "../components/MainCategories";
import MainCategories from "../components/MainCategories";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "5rem",
    width: "5rem",
  },
  control: {
    padding: theme.spacing(2),
  },
  imageContainer: {
    height: "5rem",
    width: "5rem",
    backgroundRepeat: "no-repeat",
    backgroundSize: "5rem 5rem",
    backgroundImage: `url(${"/images/products/Chilli.jpg"})`,
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  history = useHistory();

  return (
    <>
      <Grid
        container
        className={classes.root}
        spacing={2}
        style={{ marginBottom: "2rem" }}
      >
        <Grid item xs={12}>
          <Writeup />
        </Grid>
        <Grid item xs={12}>
          <BestSellingProducts />
        </Grid>
        <Grid item xs={12}>
          <MainCategories />
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
