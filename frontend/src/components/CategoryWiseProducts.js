import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { listProductsByCategoryId } from "../actions/productAction";
import Spinner from "../components/controls/Spinner";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid } from "@material-ui/core";
import ProductOverview from "../components/ProductOverview";

const CategoryWiseProducts = ({ history, match }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });
  let categoryId = match.params.categoryId;
  const productsByCategoryId = [];
  const dispatch = useDispatch();
  let renderProducts;
  useEffect(() => {
    console.log("match.params.categoryId : --> " + categoryId);

    dispatch(listProductsByCategoryId(categoryId));
  }, [dispatch, categoryId]);
  const productListByCategory = useSelector(
    (state) => state.productListByCategory
  );
  const { loading, error, category } = productListByCategory;
  console.log(productListByCategory);
  if (category && category.subCategories) {
    console.log("TRUE");
    category.subCategories.map(function (val, indx) {
      console.log(val.products);
      val.products.map(function (prd, ind) {
        console.log(prd);
        productsByCategoryId.push(prd);
      });
      return productsByCategoryId;
    });
  }

  if (productsByCategoryId && productsByCategoryId.length > 0) {
    renderProducts = (
      <Grid container spacing={isMd ? 4 : 2}>
        {productsByCategoryId.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up">
            <ProductOverview product={item} categoryId={categoryId} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    renderProducts = (
      <Message>No Records Found for Category ID : {categoryId}</Message>
    );
  }
  /**
   * BELOW CODE WILL BE REPLACED WITH dispatch -- SUNIL LAKKAKULA
   */
  /**
   * URL : http://localhost:8080/api/subcategory/2/product
   */

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>{renderProducts}</div>
      )}
    </>
  );
};

export default CategoryWiseProducts;
