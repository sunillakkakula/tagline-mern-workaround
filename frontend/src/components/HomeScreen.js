import React, { useEffect } from "react";
import Message from "./Message";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productAction";
import Paginate from "../components/Paginate";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, page, pages } = productList;
  const prds = productList.products;
  let renderProducts = "";
  console.log(prds.products);

  if (prds.products && prds.products.length > 0) {
    renderProducts = prds.products.map((product) => (
      <Col sm={12} md={8} lg={6} xl={4} key={product._id}>
        <Product product={product} />
      </Col>
    ));
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
            {renderProducts}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
