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

import { createProduct } from "../actions/productAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import { listCategories } from "../actions/categoryAction";

const ProductCreateScreen = ({ history, match }) => {
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

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  const [categorySelected, setCategorySelected] = useState(() => "");

  // const [subCategories, setSubCategories] = useState(() => []);
  const [subCategorySelected, setSubCategorySelected] = useState(() => "");
  const [countInStock, setCountInStock] = useState(() => 0);
  const [isTaxble, setIsTaxble] = useState(() => "false");
  const [taxPercent, setTaxPercent] = useState(() => 0.0);
  const [description, setDescription] = useState(() => "");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product, success } = productCreate;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  if (categories) console.log(categories);
  const allcategories = categories.categories;

  let renderCategoriesOptions = "";
  if (allcategories && allcategories.length > 0) {
    renderCategoriesOptions = allcategories.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory.id}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }
  let renderSubCategoriesOptions = "";
  if (categorySelected) {
    let filteredCategory = [];
    filteredCategory = categories.filter(function (eachCategory) {
      return (
        eachCategory.id === categorySelected &&
        eachCategory.subCategories.length > 0
      );
    });
    if (
      filteredCategory[0] &&
      filteredCategory[0].subCategories &&
      filteredCategory[0].subCategories.length
    ) {
      renderSubCategoriesOptions = filteredCategory[0].subCategories.map(
        (eachSubCategory) => {
          return (
            <MenuItem key={eachSubCategory.id} value={eachSubCategory.id}>
              {eachSubCategory.name}
            </MenuItem>
          );
        }
      );
    }
  }
  if (success) {
    console.log("Success Response to redirecting to Products List");
    history.push("/admin/products");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      "name : " +
        name +
        " , description : " +
        description +
        " , brand : " +
        brand +
        " , countInStock : " +
        countInStock +
        " , isTaxble : " +
        isTaxble +
        " , taxPercent : " +
        taxPercent
    );
    dispatch(
      createProduct({
        name,
        brand,
        categorySelected,
        subCategorySelected,
        description,
        countInStock,
        isTaxble,
        taxPercent,
      })
    );
  };

  const handleChangeCategory = (e) => {
    setCategorySelected(() => e.target.value);
  };
  const handleChangeSubCategory = (e) => {
    console.log("Exc handleChangeSubCategory" + e.target.value);
    setSubCategorySelected(e.target.value);
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
            to="/admin/productlist"
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
                <h4 className={classes.cardTitleWhite}>New Product </h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={submitHandler}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={3}>
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
                        <Grid item xs={3}>
                          <Select
                            value={categorySelected}
                            onChange={handleChangeCategory}
                            placeholder="Category"
                            style={{ width: "10rem" }}
                          >
                            {/* {renderCategories} */}
                            {renderCategoriesOptions}
                          </Select>
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
                        <Grid item xs={3}>
                          <Typography
                            variant="body1"
                            style={{
                              alignItems: "right",
                              justify: "right",
                              marginLeft: "5rem",
                            }}
                          >
                            Sub Category{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Select
                            value={subCategorySelected}
                            onChange={handleChangeSubCategory}
                            placeholder="Sub Category"
                            style={{ width: "10rem" }}
                          >
                            {/* renderSubCategories */}
                            {renderSubCategoriesOptions}
                          </Select>
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
                            placeholder="Brand"
                            variant="outlined"
                            size="small"
                            name="brand"
                            onChange={(e) => setBrand(e.target.value)}
                            type="text"
                            value={brand}
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
                            placeholder="Count In Stock"
                            variant="outlined"
                            size="small"
                            name="countInStock"
                            onChange={(e) => setCountInStock(e.target.value)}
                            type="number"
                            fullWidth
                            value={countInStock}
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
                            placeholder="Is Taxable"
                            variant="outlined"
                            size="small"
                            name="isTaxable"
                            onChange={(e) => setIsTaxble(e.target.value)}
                            type="text"
                            fullWidth
                            value={isTaxble}
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
                            placeholder="Tax Percent"
                            variant="outlined"
                            size="small"
                            name="taxPercent"
                            onChange={(e) => setTaxPercent(e.target.value)}
                            type="number"
                            fullWidth
                            value={taxPercent}
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
                        <Grid item xs={2}>
                          <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                          >
                            Create
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

export default ProductCreateScreen;
