import axios from "axios";
import {
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_DELETE_REQUEST,
  SUB_CATEGORY_DELETE_FAIL,
  SUB_CATEGORY_CREATE_REQUEST,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_FAIL,
  SUB_CATEGORY_UPDATE_REQUEST,
  SUB_CATEGORY_UPDATE_SUCCESS,
  SUB_CATEGORY_UPDATE_FAIL,
} from "../constants/subCategoryConstants";

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`/api/subcategory`);

    dispatch({
      type: SUB_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_DELETE_REQUEST,
    });

    await axios.delete(`/api/subcategory/${id}`);

    dispatch({
      type: SUB_CATEGORY_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SUB_CATEGORY_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createSubCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_CREATE_REQUEST,
    });

    const { data } = await axios.post(`/api/subcategory`, {});

    dispatch({
      type: SUB_CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: SUB_CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
 };

export const updateSubCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUB_CATEGORY_UPDATE_REQUEST,
    });

    const { data } = await axios.put(
      `/api/subcategory/${category._id}`,
      category
    );

    dispatch({
      type: SUB_CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SUB_CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
    }
    dispatch({
      type: SUB_CATEGORY_UPDATE_FAIL,
      payload: message,
    });
  }
};
