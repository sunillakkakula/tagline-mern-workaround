import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchUpdatedCartItemsCount,
  removeFromCart,
  editCartItems,
} from "../actions/cartAction";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
// import imagePath from "../assets/images/products/edible-oils/Edible-Oils-2.jpg";
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  IconButton,
  Icon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
  ButtonGroup,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import ProductScreen from "./ProductScreen";
import { Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  childPaper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  imageIcon: {
    height: "60%",
  },
  iconRoot: {
    textAlign: "center",
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

export default function CartLayoutScreen({ match, location, history }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const productId = match.params.id;
  const searchStringArray = location.search.split("&");
  console.log("searchStringArray : " + searchStringArray);
  let qty, uom, order, price;
  searchStringArray.forEach(function (item) {
    var tempField = item.split("=");
    switch (tempField[0]) {
      case "?qty":
        qty = Number(tempField[1]);
        break;
      case "uom":
        uom = tempField[1];
        break;
      case "order":
        order = tempField[1];
        break;
      case "price":
        price = Number(tempField[1]);
        break;
      default:
        break;
    }
  });
  // const [qtyCounter, setQtyCounter] = useState(() => qty);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("Clicked handleClickOpen" + order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleIncrement = () => {
  //   setQtyCounter((prevCnt) => prevCnt + 1);
  // };

  // const handleDecrement = () => {
  //   setQtyCounter((prevCnt) => prevCnt - 1);
  // };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, uom, order, price));
      // dispatch(fetchUpdatedCartItemsCount());
    }
  }, [dispatch, productId, qty, uom, order, price]);

  const removeFromCartHandler = (id, indx) => {
    console.log("Id :" + id);
    dispatch(removeFromCart(id, indx));
  };
  const editCartHandler = (id) => {
    console.log("Editing " + id);
    dispatch(editCartItems(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // const renderDialog = (
  //   <Dialog
  //     fullWidth
  //     maxWidth="md"
  //     open={open}
  //     onClose={handleClose}
  //     aria-labelledby="max-width-dialog-title"
  //   >
  //     <DialogTitle id="max-width-dialog-title">Edit Cart Item</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText>
  //         You can set my maximum width and whether to adapt or not.
  //       </DialogContentText>
  //       {/* <ProductScreen /> */}
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose} color="primary">
  //         Close
  //       </Button>
  //     </DialogActions>
  //   </Dialog>
  // );

  return (
    <div>
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cart Items</h4>
            </CardHeader>
            <CardBody>
              {cartItems.length === 0 ? (
                <div>Empty Cart</div>
              ) : (
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Paper className={classes.childPaper}>
                      {cartItems.map((item, index) => (
                        <>
                          <Grid
                            container
                            spacing={1}
                            key={item.id + "-" + index}
                          >
                            <Grid item xs={2}>
                              <img
                                alt="Staples"
                                style={{
                                  height: "3.5rem",
                                  width: "3.5rem",
                                }}
                                src={item.imageUrl}
                              />
                            </Grid>

                            <Grid item xs={8}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} variant="alignLeft">
                                  <Typography variant="body1">
                                    {item.name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                      <Typography variant="body1">
                                        <Icon
                                          classes={{ root: classes.iconRoot }}
                                        >
                                          <img
                                            alt="curency inr"
                                            src={rupeeSvgIcon}
                                            className={classes.imageIcon}
                                          />
                                        </Icon>
                                        {item.unitPrice}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Typography variant="body2">
                                        UOM : {item.uom}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Typography variant="body1">
                                        Qty :{item.quantityOrdered}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={1}>
                              {/* <Form.Control
                                as="select"
                                value={item.quantityOrdered}
                                onChange={(e) => {
                                  dispatch(removeFromCart(item.product, index));
                                  dispatch(
                                    addToCart(
                                      item.product,
                                      Number(e.target.value),
                                      item.uom,
                                      item.order
                                    )
                                  );
                                }}
                              >
                                {[...Array(item.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control> */}
                            </Grid>
                            {/* <Grid item xs={1}>
                              <ButtonGroup
                                size="small"
                                aria-label="small outlined button group"
                              >
                                <Button onClick={handleIncrement}>+</Button>
                                {qtyCounter && (
                                  <Button disabled>{qtyCounter}</Button>
                                )}
                                {qtyCounter && (
                                  <Button onClick={handleDecrement}>-</Button>
                                )}
                              </ButtonGroup>
                            </Grid> */}

                            <Grid item xs={1}>
                              <IconButton
                                aria-label="delete"
                                onClick={() =>
                                  removeFromCartHandler(item.product, index)
                                }
                              >
                                <DeleteOutline />
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Divider />
                        </>
                      ))}
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.paper}>
                      <Grid container spacing={1} data-aos="fade-up">
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            color="primary"
                            align={isMd ? "left" : "center"}
                          >
                            Subtotal (
                            {cartItems.reduce(
                              (acc, item) => acc + item.quantityOrdered,
                              0
                            )}
                            ) items
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              alt="curency inr"
                              src={rupeeSvgIcon}
                              className={classes.imageIcon}
                            />
                          </Icon>
                          {cartItems
                            .reduce(
                              (acc, item) =>
                                acc + item.quantityOrdered * item.unitPrice,
                              0
                            )
                            .toFixed(2)}
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            disabled={cartItems.length === 0}
                            size="small"
                            variant="contained"
                            type="submit"
                            color="primary"
                            onClick={checkoutHandler}
                          >
                            Proceed To Checkout
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* {renderDialog} */}
    </div>
  );
}
