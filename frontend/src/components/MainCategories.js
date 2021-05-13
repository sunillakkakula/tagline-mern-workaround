import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ButtonBase, Card } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryAction";
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
    // backgroundColor: theme.palette.common.black,
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

export default function MainCategories() {
  const classes = useStyles();
  const history = useHistory();
  let renderMainCategories;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const cats = categoryList.categories;

  console.log(cats);
  let tempImgUrl = "";

  if (cats.categories && cats.categories.length > 0) {
    renderMainCategories = (
      <Grid container className={classes.root} spacing={1}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={6}>
            {cats.categories.map((item, index) => (
              <Grid item key={item._id}>
                {
                  console.log(
                    "Each Item Id : " +
                      item._id +
                      ", Category Name : " +
                      item.name
                  )
                  // tempImgUrl = item.imageurl;
                }
                <Card className={classes.paper} spacing={1}>
                  <ButtonBase
                    focusRipple
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={() => {
                      console.log(
                        "Clicked category : " +
                          item._id +
                          " Category Name : " +
                          item.name
                      );
                      history.push(`/category/${item._id}`);
                    }}
                    style={{
                      width: "130",
                      height: "130",
                    }}
                  >
                    <img
                      className="img-thumbnail"
                      alt="Staples"
                      src={item.imageUrl}
                      style={{
                        width: "130",
                        height: "130",
                      }}
                    />

                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}></span>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    renderMainCategories = "";
  }
  return <>{renderMainCategories}</>;
}
