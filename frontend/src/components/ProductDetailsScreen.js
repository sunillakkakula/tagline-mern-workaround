import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import products from "../data/products";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";

const ProductDetailsScreen = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetails());
  }, [dispatch]);

  console.log(" match.params.id : " + match.params.id);
  const product = useSelector((state) => state.productDetails);
  // const product = products.find((p) => p._id.toString() === match.params.id);
  console.log("Product : " + product);
  return (
    <>
      <Link className="btn btn-primary my-3">Home</Link>
      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt={product.name}
            style={{ width: "25rem" }}
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>INR {product.price}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>INR {product.description}</h6>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Price </h4>
                  </Col>
                  <Col>
                    <h4> {product.price}</h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Status </h4>
                  </Col>
                  <Col>
                    <h4>
                      {" "}
                      {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button className="btn-block" type="button">
                      Add To Cart
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsScreen;
