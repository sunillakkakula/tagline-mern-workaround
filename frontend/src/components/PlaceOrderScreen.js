import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder } from "../actions/orderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import {
  Button,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  Icon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import StepperScreen from "./StepperScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  imageIcon: {
    height: "80%",
  },
  paper: {
    height: "100%",
    width: "150vh",
    padding: ".5rem",
  },
  control: {
    padding: theme.spacing(2),
  },
  link: {
    color: "white",
    backgroundColor: "#26A541",
  },
  iconRoot: {
    textAlign: "center",
  },
}));
const PlaceOrderScreen = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [payMethod, setPayMethod] = useState("");

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantityOrdered,
      0
    )
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
      // let cartItems = localStorage.getItem("paymentMethod");
      console.log(
        "localStorage.getItem(paymentMethod : " +
          localStorage.getItem("paymentMethod")
      );
      setPayMethod(localStorage.getItem("paymentMethod"));
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    console.log("EXEC placeOrderHandler ...!");
    console.log(cart);
    dispatch(
      createOrder({
        user: userInfo[0]._id,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
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
            to="/"
            style={{
              color: "white",
              backgroundColor: "#26A541",
              // marginRight: "5rem",
              // marginLeft: "0.75rem",
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <form onSubmit={placeOrderHandler}>
              {/* <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Shipping Details</Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12} style={{ margin: ".5rem" }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={3}>
                          <Typography variant="body1">Address</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="body1">
                            {cart.shippingAddress.address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={3}>
                          <Typography variant="body1">City</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="body1">
                            {" "}
                            {cart.shippingAddress.city}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={3}>
                          <Typography variant="body1">Postal Code</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="body1">
                            {cart.shippingAddress.postalCode}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider /> */}
              <Grid container>
                <Grid item xs={12}>
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <Grid conatiner>
                      <GridItem xs={12} sm={12} md={12}>
                        <StepperScreen currentStep="3" />
                      </GridItem>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h6">Shipping Details</Typography>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ margin: ".5rem" }}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography variant="body1">
                                    Address
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography variant="body1">
                                    {cart.shippingAddress.address}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography variant="body1">City</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography variant="body1">
                                    {" "}
                                    {cart.shippingAddress.city}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={3}>
                                  <Typography variant="body1">
                                    Postal Code
                                  </Typography>
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography variant="body1">
                                    {cart.shippingAddress.postalCode}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6">Order Details</Typography>
                        <Divider />
                      </Grid>
                      {cart.cartItems.map((item, index) => (
                        <Grid item key={index} style={{ margin: ".5rem" }}>
                          <Grid container>
                            <Grid item xs={3}>
                              <img
                                className="img-thumbnail"
                                src={item.imageUrl}
                                alt={item.name}
                                style={{
                                  height: "3.5rem",
                                  width: "3.5rem",
                                  marginRight: "5rem",
                                }}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <Grid container>
                                <Grid
                                  item
                                  xs={3}
                                  style={{
                                    justify: "center",
                                    alignContent: "center",
                                    marginRight: "5rem",
                                    marginTop: "1rem",
                                  }}
                                >
                                  <Link to={`/product/${item.product}`}>
                                    <Typography variant="body1">
                                      {item.name}
                                    </Typography>
                                  </Link>
                                </Grid>
                                <Grid item xs={3}>
                                  <Typography variant="body1">
                                    {item.quantityOrdered} X{" "}
                                    {/* </Typography> */}
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>
                                    {item.unitPrice}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                  <Typography variant="body1">=</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                  <Typography variant="body1">
                                    <Icon classes={{ root: classes.iconRoot }}>
                                      <img
                                        alt="curency inr"
                                        src={rupeeSvgIcon}
                                        className={classes.imageIcon}
                                      />
                                    </Icon>

                                    {item.quantityOrdered * item.unitPrice}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h6">
                              Payment Details
                              <Divider />
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="body1">
                              Payment Method
                            </Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography variant="body1">
                              {cart.paymentMethod}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={4} container>
          <Paper className={classes.paper}>
            <Typography variant="h6">Order Summary</Typography>
            <Divider />
            <Grid container spacing={1} row="true" justify="center">
              <Grid item xs={12} justify="center">
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Items Cost</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img
                          alt="curency inr"
                          src={rupeeSvgIcon}
                          className={classes.imageIcon}
                        />
                      </Icon>
                      {cart.itemsPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Shipping Cost</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img
                          alt="curency inr"
                          src={rupeeSvgIcon}
                          className={classes.imageIcon}
                        />
                      </Icon>
                      {cart.shippingPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Tax</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img
                          alt="curency inr"
                          src={rupeeSvgIcon}
                          className={classes.imageIcon}
                        />
                      </Icon>
                      {cart.taxPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <Icon classes={{ root: classes.iconRoot }}>
                        <img
                          alt="curency inr"
                          src={rupeeSvgIcon}
                          className={classes.imageIcon}
                        />
                      </Icon>
                      {cart.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {error && <Message variant="danger">{error}</Message>}
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems === 0}
                  justify="center"
                  fullWidth
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
