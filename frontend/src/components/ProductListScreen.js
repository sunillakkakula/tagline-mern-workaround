import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { Link, MenuItem } from "@material-ui/core";
// import Button from "../components/controls/Button";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
// import Table from "../components/Table/Table.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import { Table } from "react-bootstrap";
import Paginate from "../components/Paginate";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { Typography, Grid, Button, TextField, Select } from "@material-ui/core";
import {
  deleteProduct,
  createProduct,
  listProductsByCategoryId,
  listProductsBySubCategoryId,
} from "../actions/productAction";
import { Paper, IconButton } from "@material-ui/core";
import { listCategories } from "../actions/categoryAction";
import { listSubCategoriesByCategoryId } from "../actions/subCategoryAction";
const styles = {
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
};

const ProductListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const pageNumber = match.params.pageNumber || 1;

  const [categorySelected, setCategorySelected] = useState(() => "");
  const [subCategorySelected, setSubCategorySelected] = useState(() => "");
  const dispatch = useDispatch();

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setCategorySelected(() => e.target.value);
    setSubCategorySelected(() => "");
  };
  const handleChangeSubCategory = (e) => {
    console.log("Sub Category Changed  " + e.target.value);
    setSubCategorySelected(() => e.target.value);
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listSubCategoriesByCategoryId(categorySelected));
  }, [dispatch, categorySelected]);

  useEffect(() => {
    dispatch(listProductsBySubCategoryId(subCategorySelected));
  }, [dispatch, subCategorySelected]);

  const productListBySubCategory = useSelector(
    (state) => state.productListBySubCategory
  );
  const { products, page, pages } = productListBySubCategory;

  const subCategoriesByCategory = useSelector(
    (state) => state.subCategoryListByCategory
  );
  let cats;
  if (categories) {
    console.log(categories);
    cats = categories.categories;
  }

  const { subcategories } = subCategoriesByCategory;
  console.log(subcategories);

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

  let renderSubCategoriesOptions = "";
  if (subcategories && subcategories.length > 0) {
    renderSubCategoriesOptions = subcategories.map((eachSubCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachSubCategory._id}>
          {eachSubCategory.name}
        </MenuItem>
      );
    });
  }

  let renderproducts = "";

  if (products && products.length > 0) {
    renderproducts = products.map((product) => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.countInStock}</td>
        <td>{product.taxPercent}</td>
        {/* <td>{product.isTaxable}</td> */}
        <td>{product.brand}</td>
        <td>
          <EditRoundedIcon
            style={{ color: "green" }}
            onClick={() => handleEdit(product._id)}
          />
          <DeleteOutlineIcon
            style={{ color: "red" }}
            // onClick={() => }
          />
          <SettingsIcon
            style={{ color: "green" }}
            onClick={() => handleSettings(product._id)}
          />
        </td>
      </tr>
    ));
  }
  // }

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.role === "ROLE_ADMIN") history.push("/login");
    if (successCreate) {
      history.push("/admin/products");
    } else {
      dispatch(listProductsByCategoryId());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id) => {
    history.push(`/admin/product/${id}/edit`);
  };
  const handleSettings = (id) => {
    history.push(`/admin/product-settings/${id}`);
  };
  const createProductHandler = (product) => {
    history.push("/admin/product/new");
  };

  return (
    <>
      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Spinner />}
      {errorCreate && <Message variant="info">{errorCreate}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Button
                style={{
                  marginLeft: "0.75rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  align: "center",
                  width: "9rem",
                }}
                size="small"
                variant="contained"
                type="submit"
                color="primary"
                onClick={createProductHandler}
              >
                New product
              </Button>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <GridContainer>
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
                    {renderCategoriesOptions}
                  </Select>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    style={{
                      alignItems: "right",
                      justify: "right",
                      marginLeft: "5rem",
                    }}
                  >
                    Subcategory{" "}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Select
                    value={subCategorySelected}
                    onChange={handleChangeSubCategory}
                    placeholder="SubCategory"
                    style={{ width: "10rem" }}
                  >
                    {renderSubCategoriesOptions}
                  </Select>
                </Grid>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Products </h4>
                </CardHeader>
                <CardBody>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            ID
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Name
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Description
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Count In Stock
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Tax Percent
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Brand
                          </Typography>
                        </th>
                        <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Action
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>{renderproducts ? renderproducts : ""}</tbody>
                  </Table>
                  <Paginate pages={pages} page={page} isAdmin={true} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Fragment>
      )}
    </>
  );
};

export default ProductListScreen;
