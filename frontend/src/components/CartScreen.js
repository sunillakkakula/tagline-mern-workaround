import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import { addToCart, removeFromCart } from "../actions/cartAction.js";
import RupeeIcon from "../components/controls/RupeeIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Icon,
  FormGroup,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: "contain",
    height: 400,
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
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  cartButton: {
    display: "block",
    width: "75%",
  },
}));
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        alignContent="center"
        justify="space-between"
        spacing={isMd ? 4 : 2}
        className={classes.listGrid}
      >
        <Grid item xs={12} md={6} data-aos={"fade-up"}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartScreen;
