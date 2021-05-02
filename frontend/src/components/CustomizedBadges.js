import React, { useState, useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedCartItemsCount } from "../actions/cartAction";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default function CustomizedBadges() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUpdatedCartItemsCount());
    // const updatedCartItemsCount = useSelector(
    //   (state) => state.cart.cartItems.updatedCartItemsCount
    // );
    // const { cartItemsUpdatedCount } = updatedCartItemsCount;
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    console.log("cartItemsExist : " + cartItems.length);
    // setCartItemsCount(cartItemsUpdatedCount);
  }, []);

  const updatedCartItemsCount = useSelector(
    (state) => state.cart.cartItems.updatedCartItemsCount
  );
  // const { cartItemsUpdatedCount } = updatedCartItemsCount;
  // setCartItemsCount(updatedCartItemsCount);

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={updatedCartItemsCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
