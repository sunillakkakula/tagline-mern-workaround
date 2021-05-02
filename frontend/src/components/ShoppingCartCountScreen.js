import React from "react";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const ShoppingCartCountScreen = () => {
  const history = useHistory();
  return (
    <IconButton
      aria-label="cart"
      onClick={() => {
        console.log("Clicked Shopping Cart ICON");
        history.push("/showcart");
      }}
    >
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon style={{ color: "white" }} />
      </StyledBadge>
    </IconButton>
  );
};

export default ShoppingCartCountScreen;
