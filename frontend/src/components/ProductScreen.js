import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Select from "@material-ui/core/Select";
import { listProductDetailsByProductId } from "../actions/productAction";
import { listBulkByProductId } from "../actions/bulkAction";
import { listDomesticByProductId } from "../actions/domesticAction";
import { makeStyles } from "@material-ui/core/styles";
import ReactSelectMaterialUi from "react-select-material-ui";
import {
  Grid,
  Button,
  Icon,
  MenuItem,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import { Link } from "react-router-dom";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  imageFrame: {
    boxShadow: `0 5px 12px 0 ${theme.palette.cardShadow}`,
    borderRadius: theme.spacing(1),
  },
  listGrid: {
    overflow: "hidden",
  },
  partnerImage: {
    maxWidth: 120,
  },
  imageIcon: {
    height: "60%",
  },
  iconRoot: {
    textAlign: "center",
  },
  image: {
    objectFit: "contain",
    height: 300,
    width: 200,
  },
}));

const ProductScreen = ({ history, match }) => {
  let [orderTypeSelected, setOrderTypeSelected] = useState("bulk");
  const dispatch = useDispatch();
  console.log(match.params);
  useEffect(() => {
    dispatch(listProductDetailsByProductId(match.params.productId));
    dispatch(listBulkByProductId(match.params.productId));
    dispatch(listDomesticByProductId(match.params.productId));
  }, [dispatch, match]);

  const productDetailsByProductId = useSelector(
    (state) => state.productDetailsByProductId
  );
  const { product } = productDetailsByProductId;

  const bulkListByProductId = useSelector((state) => state.bulkListByProductId);
  const domesticListByProductId = useSelector(
    (state) => state.domesticListByProductId
  );

  let { bulk } = bulkListByProductId;
  let { domestic } = domesticListByProductId;

  const [quantitySelected, setQuantitySelected] = useState(() => {
    return 0;
  });

  const orderTypeOptions = ["Select", "Bulk", "Domestic"];

  const options = Array(100)
    .fill()
    .map((_, i) => {
      return i.toString();
    });

  const handleOrderTypeChange = (value) => {
    console.log("Order Type Changed :--> " + value);
    setOrderTypeSelected(value);
  };
  const calculateSellingPrice = (qtySelected) => {
    console.log("Exc calculateSellingPrice for QTY : " + qtySelected);
    if (orderTypeSelected === "Domestic" && qtySelected > 0) {
      return domestic
        .filter((eachDomestic) => eachDomestic.unitOfMessure === uom)
        .map((matchedRec) => {
          console.log(
            "matchedRec.unitPrice * counter : matchedRec.unitPrice -> " +
              matchedRec.unitPrice +
              " , qtySelected : -> " +
              qtySelected
          );
          console.log(
            "Result of CALC : -> " + matchedRec.unitPrice * qtySelected
          );
          return matchedRec.unitPrice * qtySelected;
        });
    } else if (orderTypeSelected === "Bulk" && qtySelected > 0) {
      return bulk
        .filter((eachBulk) => eachBulk.unitOfMessure === uom)
        .map((matchedRec) => {
          console.log(
            "matchedRec.unitPrice * counter : matchedRec.unitPrice -> " +
              matchedRec.unitPrice +
              " , qtySelected : -> " +
              qtySelected
          );
          console.log("Result of CALC" + matchedRec.unitPrice * qtySelected);
          return matchedRec.unitPrice * qtySelected;
        });
    }
  };
  const [calculatedSellingPrice, setCalculatedSellingPrice] = useState(() => {
    return 0.0;
  });

  const classes = useStyles();
  const [uom, setUom] = useState(() => "None");
  // const [disableFlag, setDisableFlag] = useState(Boolean(true));

  const renderUomOptions = () => {
    console.log("*** Exec renderUomOptions --> Reading product ****");
    console.log("orderTypeSelected : " + orderTypeSelected);
    if (orderTypeSelected === "Domestic") {
      console.log("Exec Domestic Option Menu Code");

      if (domestic) {
        console.log(domestic);
        return domestic.map((domesticItem, i) => {
          return (
            <MenuItem key={i} value={domesticItem.unitOfMessure}>
              {domesticItem.unitOfMessure}
            </MenuItem>
          );
        });
      }
    } else if (orderTypeSelected === "Bulk") {
      if (bulk) {
        return bulk.map((bulkItem, i) => {
          return (
            <MenuItem key={i} value={bulkItem.unitOfMessure}>
              {bulkItem.unitOfMessure}
            </MenuItem>
          );
        });
      }
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.productId}?qty=${quantitySelected}&uom=${uom}&order=${orderTypeSelected}&price=${calculatedSellingPrice}`
    );
  };

  const handleChangeUom = (event) => {
    console.log("Handler for Change of UOM : Value :-> " + event.target.value);
    setUom((u) => event.target.value);
    setQuantitySelected(0);
    setCalculatedSellingPrice(0.0);
  };
  const handleChangeCounter = (value) => {
    console.log("value : " + value);
    if (value !== "0") {
      console.log("Quantity selected is NOT equal 0");
      setQuantitySelected(value);
      const calculatedPrice = calculateSellingPrice(value);
      console.log(calculatedPrice);
      setCalculatedSellingPrice(calculatedPrice);
    }
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
            to="/"
            style={{
              color: "white",
              backgroundColor: "#26A541",
              marginTop: "1rem",
              marginBottom: "1rem",
              align: "center",
              width: "9rem",
            }}
          >
            Go to Groceries
          </Link>
        </GridItem>
      </GridContainer>
      {/* {console.log("Product : " + product)} */}
      {!product ? (
        <Message />
      ) : (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{product.description}</Typography>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} data-aos="fade-up">
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} align="left">
                            Order Type
                          </Grid>
                          <Grid item xs={6} align="center">
                            <ReactSelectMaterialUi
                              style={{ width: "10rem" }}
                              value="bulk"
                              options={orderTypeOptions}
                              onChange={handleOrderTypeChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} align="left">
                            Unit Of Messure
                          </Grid>
                          <Grid item xs={6} align="center">
                            <Select value={uom} onChange={handleChangeUom}>
                              {renderUomOptions()}
                            </Select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} align="left">
                            Quantity
                          </Grid>
                          <Grid item xs={6} align="center">
                            <ReactSelectMaterialUi
                              style={{ width: "10rem" }}
                              value={quantitySelected}
                              options={options}
                              onChange={handleChangeCounter}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} align="left">
                            Price
                          </Grid>
                          <Grid item xs={6} align="center">
                            <Icon classes={{ root: classes.iconRoot }}>
                              <img
                                alt="curency inr"
                                src={rupeeSvgIcon}
                                className={classes.imageIcon}
                              />
                            </Icon>{" "}
                            {calculatedSellingPrice
                              ? calculatedSellingPrice
                              : 0.0}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={6} align="left">
                            Availability Status
                          </Grid>
                          <Grid item xs={6} align="center">
                            {product.countInStock > 0 ? (
                              <span style={{ color: "green", fontWeight: 500 }}>
                                IN STOCK
                              </span>
                            ) : (
                              <span style={{ color: "red", fontWeight: 500 }}>
                                OUT OF STOCK
                              </span>
                            )}
                            {/* {product.price} */}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} align="center">
                        <Button
                          disabled={
                            product.countInStock === 0 ||
                            calculatedSellingPrice === 0
                          }
                          align="center"
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img
                  alt="productImage"
                  src={product.imageUrl}
                  className={classes.image}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
