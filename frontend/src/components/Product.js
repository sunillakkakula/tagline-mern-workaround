import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  //   const { product } = props;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        {/* <a href={`/product/${product._id}`}>{product.name}</a> */}
        <Card.Title as="div">
          <Link to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as="h5">
          <strong>INR {product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
