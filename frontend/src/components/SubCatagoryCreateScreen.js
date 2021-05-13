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
import { listCategories } from "../actions/categoryAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import { createSubCategoryByCategory } from "../actions/subCategoryAction";

const SubCatagoryCreateScreen = ({ history, match }) => {
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 0,
      padding: 1,
      marginTop: "1rem",
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "inherit",
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => "");

  const dispatch = useDispatch();

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setSelectedCategoryId(() => e.target.value);
  };
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  let cats = categories ? categories.categories : [];

  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const { success } = subCategoryCreate;

  let renderCategoriesOptions = "";
  if (cats && cats.length > 0) {
    renderCategoriesOptions = cats.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory._id}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }

  if (success) {
    console.log("Success Response to redirecting to Sub Category List");
    history.push("/admin/subcategories");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "From subMitHandler UI Screen -  name : " +
        name +
        " , description : " +
        description +
        " , selectedCategoryId : " +
        selectedCategoryId
    );
    dispatch(
      createSubCategoryByCategory({
        name,
        description,
        selectedCategoryId,
      })
    );
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Link
            className="btn"
            size="small"
            variant="contained"
            type="submit"
            color="primary"
            to="/admin/subcategories"
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
      {loading && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <GridContainer spacing={1} alignItems="center" justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>New Sub Category </h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={submitHandler}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          justify="center"
                        >
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              style={{
                                alignItems: "right",
                                justify: "right",
                                marginLeft: "5rem",
                              }}
                            >
                              Category{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Select
                              value={selectedCategoryId}
                              onChange={handleChangeCategory}
                              placeholder="Category"
                              style={{ width: "10rem" }}
                            >
                              {renderCategoriesOptions}
                            </Select>
                          </Grid>
                        </Grid>
                        {/* <Grid item xs={6}></Grid> */}
                      </Grid>
                    </GridContainer>
                  </GridItem>

                  <Grid container spacing={1}>
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
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
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
                            placeholder="Description"
                            variant="outlined"
                            size="small"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            value={description}
                            fullWidth
                            InputProps={{
                              classes: { input: classes.input },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={3} style={{ margin: "auto" }}>
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={6}>
                          <Button
                            style={{
                              marginRight: "0.75rem",
                              align: "center",
                              width: "9rem",
                            }}
                            size="small"
                            variant="contained"
                            type="submit"
                            color="primary"
                            // onClick={handleSave}
                          >
                            ADD
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </>
  );
};

export default SubCatagoryCreateScreen;
