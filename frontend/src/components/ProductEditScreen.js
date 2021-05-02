import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { Link } from "react-router-dom";
// import Button from "../components/controls/Button";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
// import Table from "../components/Table/Table.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import {
  listProductDetailsByProductId,
  updateProduct,
} from "../actions/productAction";
import { Table } from "react-bootstrap";
import Paginate from "../components/Paginate";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productAction";
import { useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;
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

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetailsByProductId = useSelector(
    (state) => state.productDetailsByProductId
  );
  const { loading, error, product } = productDetailsByProductId;
  // const productUpdate = useSelector((state) => state.productUpdate);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = productUpdate;
  useEffect(() => {
    if (product.id !== productId) {
      console.log("!product.name || product.id !== productId");
      dispatch(listProductDetailsByProductId(productId));
    } else {
      console.log("Exec Else of !product.name || product.id !== productId");
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, history, productId]);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { data } = await axios.post("/api/upload", formData, config);

  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   updateProduct({
    //     _id: productId,
    //     name,
    //     price,
    //     image,
    //     brand,
    //     category,
    //     description,
    //     countInStock,
    //   })
    // );
  };
  return (
    <>
      {/* {loadingUpdate && <Spinner />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
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
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Product </h4>
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
                        </Grid>
                      </Grid>
                    </Grid>
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          // direction="column"
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
                              placeholder="Count In Stock"
                              variant="outlined"
                              size="small"
                              name="countInStock"
                              onChange={(e) => setCountInStock(e.target.value)}
                              type="text"
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
                              placeholder="Category"
                              variant="outlined"
                              size="small"
                              name="category"
                              onChange={(e) => setCategory(e.target.value)}
                              type="text"
                              value={category}
                              fullWidth
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
                              placeholder="Enter Image Url"
                              variant="outlined"
                              size="small"
                              name="image"
                              onChange={(e) => setImage(e.target.value)}
                              type="text"
                              fullWidth
                              value={image}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                            <file
                              id="image-file"
                              label="Choose File"
                              // custom
                              // onChange={uploadFileHandler}
                            ></file>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          // alignItems="center"
                          justify="center"
                        >
                          <Grid item xs={6} justify="center">
                            <Button
                              size="small"
                              variant="contained"
                              type="submit"
                              color="primary"
                            >
                              Update
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
        </Fragment>
      )}
    </>
  );
};

export default ProductEditScreen;
