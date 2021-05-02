import React, { useState, useEffect } from "react";
import Rating from "../Rating";
import BulkLooseRadioGroup from "../controls/BulkLooseRadioGroup";

import { RupeeIcon } from "../controls/RupeeIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import rupeeSvgIcon from "../assets/images/currency-inr.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Image from "../atoms/Image/Image";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
  },
  imageIcon: {
    height: "100%",
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

const ProductDetailsScreen = (prd) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { product } = prd;
  let [qty, setQty] = useState(1);
  const classes = useStyles();
  let [counter, setCounter] = useState(1);
  let [orderTypeSelected, setOrderTypeSelected] = useState("loose");
  let [isBulkOrder, setBulkOrder] = useState(false);
  useEffect(() => {
    console.log("Exec Use Effect as order Type is Chnaged");
    setOrderTypeSelected(orderTypeSelected);
    setBulkOrder(true);
  }, []);
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const addToCartHandler = () => {
    // history.push(`/cart/${prd._id}?qty=${prd.qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Clicked Submit Handler");
  };

  const renderQtyUI = ({ isBulkOrder, qty }) => {
    if (orderTypeSelected === "b") {
      console.log(" IS BULK ORDER so return UI for that" + orderTypeSelected);

      return;
      <Select value={qty} onChange={(e) => setQty(e.target.value)}>
        {[...Array(product.countInStock).keys()].map((x) => (
          <MenuItem key={x + 1} value={x + 1}>
            {x + 1}
          </MenuItem>
        ))}
      </Select>;
    } else {
      console.log(" IS LOOSE ORDER so return UI for that" + orderTypeSelected);
      return (
        <ButtonGroup
          style={{ size: "small" }}
          className="small outlined button group"
          aria-label="small outlined button group"
        >
          {<Button onClick={handleDecrement}>-</Button>}
          {<Button disabled>{counter}</Button>}
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
      );
    }
  };

  const currentCBHandler = (orderTypeValue) => {
    // console.log("Order Type Selected :" + orderTypeValue);
    orderTypeSelected = orderTypeValue;
    setOrderTypeSelected(...orderTypeSelected, orderTypeSelected);
    console.log(
      "orderTypeValue :" +
        orderTypeValue +
        " orderTypeSelected : " +
        orderTypeSelected
    );

    setBulkOrder(orderTypeValue === "bulk" ? true : false);
    console.log(
      "is Order Type Bulk ? " +
        isBulkOrder +
        ", orderTypeValue: " +
        orderTypeValue
    );
  };

  return (
    <>
      <Paper>
        <BulkLooseRadioGroup parentCB={currentCBHandler} />
        <Grid container>
          <Grid item xs={3}>
            <Image
              src={product.image}
              alt={product.name}
              width="3.5rem"
              height="3.5rem"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={3}>
            <Grid item>
              <h3>{product.name}</h3>
            </Grid>
            <Grid item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Grid>
            <Grid item>
              Price:{" "}
              <span style={{ position: "absolute", right: "5px" }}>
                <Icon classes={{ root: classes.iconRoot }}>
                  <img alt="curency inr" src={rupeeSvgIcon} />
                </Icon>
              </span>
              {product.price}
            </Grid>
            <Grid item>Description: {product.description}</Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                {renderQtyUI(isBulkOrder)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProductDetailsScreen;
