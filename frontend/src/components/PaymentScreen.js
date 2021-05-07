import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";
import { Link } from "react-router-dom";
import {
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import StepperScreen from "./StepperScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  paper: {
    height: "100%",
    width: "100vh",
    padding: "2rem",
  },
  control: {
    padding: theme.spacing(2),
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

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const classes = useStyles();
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [paymentMethod, setPaymentMethod] = useState("gpay");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
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
          <StepperScreen currentStep={2} />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Payment Details</h4>
            </CardHeader>
            <CardBody>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} container justify="center">
                  <Paper className={classes.paper}>
                    <form onSubmit={submitHandler}>
                      <Grid item xs={12} container>
                        <RadioGroup
                          aria-label="payment"
                          name="payment"
                          value={paymentMethod}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="gpay"
                            control={<Radio />}
                            label="G-Pay"
                          />
                          <FormControlLabel
                            value="upi"
                            control={<Radio />}
                            label="UPI payment"
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12} container justify="center">
                        <Button
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                        >
                          Continue
                        </Button>
                      </Grid>
                    </form>
                  </Paper>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default PaymentScreen;
