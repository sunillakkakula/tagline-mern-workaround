import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

// import products from "../data/products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={8} lg={6} xl={4}>
            <Product product={product} key={product._id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
