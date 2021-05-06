import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import test_product_image from "../assets/images/products/Vaishnavi.jpeg";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import Image from "./atoms/Image/Image";

const ProductOverview = ({ match, product, categoryId }) => {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    imageIcon: {
      height: "100%",
    },
    paper: {
      height: "90%",
      width: "100vh",
      padding: ".5rem",
    },
    iconRoot: {
      textAlign: "center",
    },
    newButton: {
      position: "absolute",
      right: "10px",
    },
    image: {
      objectFit: "contain",
      height: 120,
    },
    fontWeightBold: {
      fontWeight: "bold",
    },
    cardMedia: {
      padding: theme.spacing(2, 2, 0, 2),
      display: "flex",
      justifyContent: "center",
    },
    addButton: {
      width: "100%",
      // padding: 14px 28px;
      // font-size: 16px;
      cursor: "pointer",
      // text-align: center;
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const classes = useStyles();

  const addToCartHandler = () => {
    console.log("Clicked Add to Cart Handler");
    history.push(`/product/${product._id}`);
  };

  return (
    <>
      <Card raised={true}>
        <CardMedia className={classes.cardMedia}>
          <Image
            src={product.imageUrl ? product.imageUrl : ""}
            alt={product.name}
            className={classes.image}
          />
        </CardMedia>
        <CardContent>
          <Grid container spacing={2} align="center">
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="subtitle1" align="left">
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                color="textPrimary"
                variant="subtitle1"
                className={classes.fontWeightBold}
                align="right"
              ></Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} align="center">
            <Grid item xs={12} align="center">
              <Button
                size="small"
                variant="contained"
                type="submit"
                color="primary"
                className={classes.addButton}
                onClick={() => {
                  addToCartHandler();
                }}
                disabled={product.countInStock === 0}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductOverview;
