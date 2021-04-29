import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../actions/cartAction";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  //location.search :--> Query Params
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);
  return <div>Cart</div>;
};

export default CartScreen;
