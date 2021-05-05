import axios from "axios";
import {
  BULK_LIST_BY_PRODUCT_ID_REQUEST,
  BULK_LIST_BY_PRODUCT_ID_SUCCESS,
  BULK_LIST_BY_PRODUCT_ID_FAIL,
  BULK_CREATE_BY_PRODUCT_ID_REQUEST,
  BULK_CREATE_BY_PRODUCT_ID_SUCCESS,
  BULK_CREATE_BY_PRODUCT_ID_FAIL,
  BULK_UPDATE_BY_PRODUCT_ID_REQUEST,
  BULK_UPDATE_BY_PRODUCT_ID_SUCCESS,
  BULK_UPDATE_BY_PRODUCT_ID_FAIL,
  BULK_DELETE_BY_PRODUCT_ID_REQUEST,
  BULK_DELETE_BY_PRODUCT_ID_SUCCESS,
  BULK_DELETE_BY_PRODUCT_ID_FAIL,
} from "../constants/bulkConstants";

export const listBulkByProductId = (id) => async (dispatch) => {
  try {
    dispatch({ type: BULK_LIST_BY_PRODUCT_ID_REQUEST });

    const { data } = await axios.get(`/api/avail-bulk/product/${id}`);

    dispatch({
      type: BULK_LIST_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BULK_LIST_BY_PRODUCT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBulkByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BULK_DELETE_BY_PRODUCT_ID_REQUEST,
    });

    await axios.delete(`/api/avail-bulk/product/${id}`);

    dispatch({
      type: BULK_DELETE_BY_PRODUCT_ID_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BULK_DELETE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};

export const createBulkByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BULK_CREATE_BY_PRODUCT_ID_REQUEST,
    });

    const { data } = await axios.post(`/api/avail-bulk/product/${id}`, {});

    dispatch({
      type: BULK_CREATE_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: BULK_CREATE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};

export const updateBulkByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BULK_UPDATE_BY_PRODUCT_ID_REQUEST,
    });

    const { data } = await axios.put(`/api/avail-bulk/product/${id}`);

    dispatch({
      type: BULK_UPDATE_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
    dispatch({
      type: BULK_UPDATE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};
