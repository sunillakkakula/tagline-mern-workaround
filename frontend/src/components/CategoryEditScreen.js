import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Spinner from "./controls/Spinner";
import { Link } from "react-router-dom";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardBody from "./Card/CardBody.js";
import { listCategoryById, updateCategory } from "../actions/categoryAction";

import { Grid, Button, TextField } from "@material-ui/core";

const CategoryEditScreen = ({ history, match }) => {
  const categoryId = match.params.id;
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 0,
      padding: 1,
      marginTop: "1rem",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "inherit",
      // justifyContent: "center",
      // alignContent: "center",
      alignItems: "center",
      height: "30rem",
      width: "30rem",
    },
    inputText: {
      margin: "auto",
      padding: "1rem",
      alignContent: "center",
    },

    input: {
      "&::placeholder": {
        color: "gray",
        fontSize: "0.85rem",
        fontWeight: 500,
        fontFamily: "Roboto",
      },
      color: "gray", // if you also want to change the color of the input, this is the prop you'd use
    },
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF",
      },
    },
    cardTitleGreen: {
      color: "#26A541",
      marginTop: "0px",
      minHeight: "auto",
      fontFamily: "Roboto",
      marginBottom: "3px",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: "capitalize",
      textAlign: "left",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  }));
  const classes = useStyles();

  const [name, setName] = useState(() => "");
  const [description, setDescription] = useState(() => "");
  const categoryDetailsById = useSelector((state) => state.categoryDetailsById);
  const { loading, error, category } = categoryDetailsById;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Exec useEffect()..." + categoryId);
    /* dispatch(listCategoryById(categoryId));*/
    if (category.name) {
      populateNameDesc();
    } else {
      dispatch(listCategoryById(categoryId));
    }
  }, [dispatch, categoryId, category.name]);

  const populateNameDesc = () => {
    console.log("Exec populateNameDesc");
    setName((nm) => category.name);
    setDescription((dsc) => category.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "submitHandler Exec updateCategory",
      name,
      description,
      category
    );

    dispatch(updateCategory(categoryId, name, description));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Link
                className="btn"
                size="small"
                variant="contained"
                type="submit"
                color="primary"
                to="/admin/categorylist"
                style={{
                  color: "white",
                  backgroundColor: "#26A541",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  align: "center",
                  width: "9rem",
                }}
              >
                Go Back
              </Link>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Category </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          justify="center"
                        >
                          <Grid item xs={6}>
                            <TextField
                              className={classes.inputText}
                              placeholder="Name"
                              variant="outlined"
                              name="name"
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              size="small"
                              value={name}
                              fullWidth
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          </Grid>

                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item xs={6}>
                              <TextField
                                className={classes.inputText}
                                placeholder="Description"
                                variant="outlined"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                size="small"
                                value={description}
                                fullWidth
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item xs={5} justify="center"></Grid>
                            <Grid item xs={2} justify="center">
                              <Button
                                size="small"
                                variant="contained"
                                type="submit"
                                color="primary"
                              >
                                Update
                              </Button>
                            </Grid>
                            <Grid item xs={5} justify="center"></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Fragment>
      )}
    </>
  );
};

export default CategoryEditScreen;
