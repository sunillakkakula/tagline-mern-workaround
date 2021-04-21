import React, { useEffect } from "react";
import Message from "./Message";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={8} lg={6} xl={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
