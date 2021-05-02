import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ButtonBase, Card } from "@material-ui/core";
import { listBestSellerProducts } from "../actions/productAction";
import Message from "./Message";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 130,
    width: 130,
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const BestSellingProducts = () => {
  const classes = useStyles();
  const history = useHistory();
  let renderBestSellerProducts;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listBestSellerProducts());
  }, [dispatch]);
  const bestSellers = useSelector((state) => state.bestSellers);
  const { loading, error, bestSellerProducts } = bestSellers;
  console.log(bestSellerProducts);

  if (bestSellerProducts && bestSellerProducts.length > 0) {
    renderBestSellerProducts = (
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={6}>
            {bestSellerProducts.map((item, index) => (
              <Grid item key={item._id}>
                {console.log(
                  "Each Item Id : " +
                    item._id +
                    ", subCategoryId : " +
                    item._subCategory
                )}
                <Card className={classes.paper} spacing={1}>
                  <ButtonBase
                    focusRipple
                    className={classes.image}
                    onClick={() => {
                      console.log(
                        "Clicked " +
                          item.id +
                          "ITEMS IMAGE URL " +
                          item.imageurl
                      );
                      history.push(`/product/${item._id}`);
                    }}
                    style={{
                      width: "8rem",
                      height: "8rem",
                    }}
                  >
                    <img
                      alt="Staples"
                      style={{
                        width: "7rem",
                        height: "6rem",
                      }}
                      src={item.imageUrl}
                    />
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    renderBestSellerProducts = (
      <Message>No Records Found for Best Seller category : </Message>
    );
  }
  return <>{renderBestSellerProducts}</>;
};
export default BestSellingProducts;
