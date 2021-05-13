import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_BY_CATEGORY_ID_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_ID_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_ID_FAIL,
  PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_REQUEST,
  PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_SUCCESS,
  PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
  PRODUCT_DETAILS_BY_PRODUCT_ID_REQUEST,
  PRODUCT_DETAILS_BY_PRODUCT_ID_SUCCESS,
  PRODUCT_DETAILS_BY_PRODUCT_ID_FAIL,
  PRODUCT_LIST_BEST_SELLER_REQUEST,
  PRODUCT_LIST_BEST_SELLER_SUCCESS,
  PRODUCT_LIST_BEST_SELLER_FAIL,
} from "../constants/productConstants";
import { logout } from "./userAction";

export const listProducts = (
  productid,
  keyword = "",
  pageNumber = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // {`/api/subcategory/2/product/${match.params.id}`;}
    const { data } = await axios.get("/api/subcategory/2/product");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
    console.log(" Response Data : " + data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsBySubCategory = (
  productid,
  keyword = "",
  pageNumber = ""
) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST });
    const { data } = await axios.get("/api/subcategory/2/product");

    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
    console.log(" Response Data : " + data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProductDetails = (subCategoryId, productId) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_REQUEST });

    const { data } = await axios.get(
      `/api/subcategory/${subCategoryId}/product/${productId}`
    );

    dispatch({
      type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetailsByProductId = (id) => async (dispatch) => {
  try {
    console.log("Inside listProductDetailsByProductId : " + id);
    dispatch({ type: PRODUCT_DETAILS_BY_PRODUCT_ID_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
    console.log(" Response Data : " + data);
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_BY_PRODUCT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsByCategoryId = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_ID_REQUEST });
    const { data } = await axios.get(`/api/product/cat/${categoryId}`);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_ID_SUCCESS,
      payload: data,
    });
    // console.log(" Response Data : " + data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProductsBySubCategoryId = (subCategoryId) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_SUB_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/product/subcat/${subCategoryId}`);

    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
    console.log(" Response Data : " + data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_SUB_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetailsBySubCategoryIdProductId = (
  subCategoryId,
  productId
) => async (dispatch) => {
  try {
    console.log(
      "Inside product ACtion listProductDetailsBySubCategoryIdProductId  " +
        subCategoryId +
        "Product ID : " +
        productId
    );
    dispatch({ type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_REQUEST });

    const { data } = await axios.get(
      `/api/subcategory/${subCategoryId}/product/${productId}`
    );

    dispatch({
      type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_BY_SUBCATEGORY_ID_PRODUCT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });
    console.log(product);
    const {
      name,
      brand,
      description,
      countInStock,
      isTaxble,
      taxPercent,
    } = product;
    console.log(
      "name : " +
        product.name +
        " , description : " +
        product.description +
        " , brand : " +
        product.brand +
        " , countInStock : " +
        product.countInStock +
        " , isTaxable : " +
        product.isTaxable +
        " , taxPercent : " +
        product.taxPercent
    );
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await axios.post(
      `/api/subcategory/${product.subCategorySelected}/product`,
      {
        name,
        brand,
        description,
        countInStock,
        isTaxble,
        taxPercent,
      }
    );

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBestSellerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BEST_SELLER_REQUEST });

    const { data } = await axios.get(`/api/product/best-seller`);

    dispatch({
      type: PRODUCT_LIST_BEST_SELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BEST_SELLER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
