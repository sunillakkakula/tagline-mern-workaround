import axios from "axios";
import {
  DOMESTIC_LIST_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_LIST_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_LIST_BY_PRODUCT_ID_FAIL,
  DOMESTIC_CREATE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_CREATE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_CREATE_BY_PRODUCT_ID_FAIL,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_FAIL,
  DOMESTIC_DELETE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_DELETE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_DELETE_BY_PRODUCT_ID_FAIL,
} from "../constants/domesticConstants";

export const listDomesticByProductId = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOMESTIC_LIST_BY_PRODUCT_ID_REQUEST });

    const { data } = await axios.get(`/api/avail-domestic/product/${id}`);

    dispatch({
      type: DOMESTIC_LIST_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOMESTIC_LIST_BY_PRODUCT_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDomesticByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOMESTIC_DELETE_BY_PRODUCT_ID_REQUEST,
    });

    await axios.delete(`/api/avail-domestic/product/${id}`);

    dispatch({
      type: DOMESTIC_DELETE_BY_PRODUCT_ID_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DOMESTIC_DELETE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};

export const createDomesticByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOMESTIC_CREATE_BY_PRODUCT_ID_REQUEST,
    });

    const { data } = await axios.post(`/api/avail-domestic/product/${id}`, {});

    dispatch({
      type: DOMESTIC_CREATE_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: DOMESTIC_CREATE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};

export const updateDomesticByProductId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOMESTIC_UPDATE_BY_PRODUCT_ID_REQUEST,
    });

    const { data } = await axios.put(`/api/avail-domestic/product/${id}`);

    dispatch({
      type: DOMESTIC_UPDATE_BY_PRODUCT_ID_SUCCESS,
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
      type: DOMESTIC_UPDATE_BY_PRODUCT_ID_FAIL,
      payload: message,
    });
  }
};
