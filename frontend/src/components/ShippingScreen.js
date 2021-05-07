import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import {
  Grid,
  Button,
  Paper,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import StepperScreen from "./StepperScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2),
    // height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textarea: {
    resize: "both",
    margin: "auto",
    padding: "1rem",
    alignContent: "center",
  },
  paper: {
    height: "45vh",
    width: "70vh",
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

const ShippingScreen = ({ history }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode }));
    history.push("/payment");
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <StepperScreen currentStep={1} />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Shipping Details</h4>
            </CardHeader>
            <CardBody>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={1}>
                    <Grid item>
                      <form onSubmit={submitHandler}>
                        <Paper className={classes.paper}>
                          <Grid item xs={12}>
                            <TextField
                              placeholder="Address"
                              multiline
                              onChange={(e) => setAddress(e.target.value)}
                              fullWidth
                              variant="outlined"
                              inputProps={{ className: classes.textarea }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.inputText}
                              placeholder="City"
                              variant="outlined"
                              size="small"
                              name="city"
                              fullWidth
                              onChange={(e) => setCity(e.target.value)}
                              type="text"
                              value={city}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.inputText}
                              placeholder="Postal Code"
                              variant="outlined"
                              size="small"
                              name="postalcode"
                              fullWidth
                              onChange={(e) => setPostalCode(e.target.value)}
                              type="text"
                              value={postalCode}
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Grid container justify="center" spacing={1}>
                              <Grid item xs={12}>
                                <Button
                                  style={{
                                    align: "center",
                                  }}
                                  fullWidth
                                  size="small"
                                  variant="contained"
                                  type="submit"
                                  color="primary"
                                >
                                  Proceed to Payment
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </form>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default ShippingScreen;
