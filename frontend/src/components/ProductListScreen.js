import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { Link } from "@material-ui/core";
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
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
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

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

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
      dispatch(listProducts());
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
    // dispatch(createProduct(1));
    // console.log("Create product Handler");
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
                        {/* <th>
                          <Typography
                            className={classes.cardTitleGreen}
                            align="center"
                          >
                            Is Taxable
                          </Typography>
                        </th> */}
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
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.countInStock}</td>
                          <td>{product.taxPercent}</td>
                          {/* <td>{product.isTaxable}</td> */}
                          <td>{product.brand}</td>
                          <td>
                            <EditRoundedIcon
                              style={{ color: "green" }}
                              onClick={() => handleEdit(product.id)}
                            />
                            <DeleteOutlineIcon
                              style={{ color: "red" }}
                              // onClick={() => }
                            />
                            <SettingsIcon
                              style={{ color: "green" }}
                              onClick={() => handleSettings(product.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
