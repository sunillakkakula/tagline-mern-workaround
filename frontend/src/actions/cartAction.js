import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ITEMS_COUNT,
  CART_EDIT_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, quantityOrdered, uom, order) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(
    `/api/product/${id}`
  );
  let updatedCartItemsCount = 0;

  // if (getState().cart.cartItems.cartItemsCount) {
  //   updatedCartItemsCount =
  //     Number(getState().cart.cartItems.cartItemsCount) +
  //     Number(quantityOrdered);
  // } else {
  //   updatedCartItemsCount = updatedCartItemsCount + Number(quantityOrdered);
  // }
  // localStorage.setItem("cartItemsCount", JSON.stringify(updatedCartItemsCount));

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      imageUrl: data.imageurl,
      description: data.name,
      // image: data.imageUrl,
      // cartItemsCount: updatedCartItemsCount,
      unitPrice:
        order === "Domestic"
          ? data.availableInDomestic
              .filter((p) => uom === p.unitOfMessure)
              .map((matchedRec) => matchedRec.sellingPrice)[0]
          : data.availableInBulk
              .filter((p) => uom === p.unitOfMessure)
              .map((matchedRec) => matchedRec.sellingPrice)[0],
      totalPrice:
        order === "Domestic"
          ? data.availableInDomestic
              .filter((p) => uom === p.unitOfMessure)
              .map(
                (matchedRec) =>
                  Number(matchedRec.unitPrice) * Number(quantityOrdered)
              )[0]
          : data.availableInBulk
              .filter((p) => uom === p.unitOfMessure)
              .map(
                (matchedRec) =>
                  Number(matchedRec.unitPrice) * Number(quantityOrdered)
              )[0],
      countInStock: data.countInStock,
      quantityOrdered,
      uom,
      orderType: order === "Domestic" ? "Domestic" : "Bulk",
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (product, index) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { product, index },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const editCartItems = (product) => (dispatch, getState) => {
  dispatch({
    type: CART_EDIT_ITEM,
    payload: product,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const fetchUpdatedCartItemsCount = () => (dispatch, getState) => {
  dispatch({
    type: CART_ITEMS_COUNT,
    payload: getState().cart.cartItems.cartItemsCount,
  });
};
