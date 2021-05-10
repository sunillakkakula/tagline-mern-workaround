import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getOrderDetailsById } from "../actions/orderAction";
import { Divider, Grid, Icon, Paper, Typography } from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import imagePath from "../assets/images/products/edible-oils/Edible-Oils-2.jpg";

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

  link: {
    color: "white",
    backgroundColor: "#26A541",
  },
  iconRoot: {
    textAlign: "center",
  },
}));

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const classes = useStyles();
  // const theme = useTheme();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) history.push("/login");

    if (orderId) dispatch(getOrderDetailsById(orderId));
  }, [dispatch, history, orderId, userInfo]);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log("Fetched Order by ID : " + orderId);
  console.log(order);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link
            className="btn"
            to="/"
            style={{
              color: "white",
              backgroundColor: "#26A541",
              marginRight: "5rem",
            }}
          >
            Go to Groceries
          </Link>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={8} container justify="left">
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                {order.orderItems.length === 0 ? (
                  <Message>Your Order is empty</Message>
                ) : (
                  <Grid conatiner>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12} container justify="flex-start">
                          <Typography variant="h6">Shipping </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Name: </strong> {order.user.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            <strong>Email: </strong>{" "}
                            <a href={`mailto:${order.user.email}`}>
                              {order.user.email}
                            </a>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Address: </strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                {order.shippingAddress.address},{" "}
                                {/* {order.shippingAddress.city}{" "}
                                {order.shippingAddress.postalCode},{" "} */}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>City: </strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                {order.shippingAddress.city}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                <strong>Postal Code : </strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body1">
                                {order.shippingAddress.postalCode},{" "}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Typography variant="h6">Order # {orderId}</Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Typography variant="h6">Order Details</Typography>
                    </Grid>
                    {order.orderItems.map((item, index) => (
                      <Grid item key={index}>
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
                                <Typography variant="body1">
                                  {item.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body1">
                                  {item.quantityOrdered} X
                                  <Icon classes={{ root: classes.iconRoot }}>
                                    <img
                                      alt="curency inr"
                                      src={rupeeSvgIcon}
                                      className={classes.imageIcon}
                                    />
                                  </Icon>
                                  {item.totalPrice}=
                                </Typography>
                              </Grid>
                              <Grid item xs={3} align="right">
                                <Typography variant="body1">
                                  <Icon classes={{ root: classes.iconRoot }}>
                                    <img
                                      alt="curency inr"
                                      src={rupeeSvgIcon}
                                      className={classes.imageIcon}
                                    />
                                  </Icon>

                                  {item.quantityOrdered * item.totalPrice}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}></Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h6">Payment Details</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            Payment Method
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            {order.paymentMethod}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            {order.isPaid ? (
                              <Message variant="success">
                                Paid on {order.paidAt}
                              </Message>
                            ) : (
                              <Message variant="danger">Not Paid</Message>
                            )}
                          </Typography>
                        </Grid>
                        <Divider />
                      </Grid>
                      <Divider />
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="body1">
                              {order.isDelivered ? (
                                <Message variant="success">
                                  Delivered on {order.deliveredAt}
                                </Message>
                              ) : (
                                <Message variant="danger">
                                  Not Delivered
                                </Message>
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4} container justify="center">
          <Paper className={classes.paper}>
            <Typography variant="h6">Order Summary</Typography>
            <Divider />
            <Grid container spacing={1} row justify="center">
              <Grid item xs={12}>
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
                      {order.totalPrice}
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
                      {order.shippingPrice}
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
                      {order.taxPrice}
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
                      {order.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {error && <Message variant="danger">{error}</Message>}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
