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
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_REQUEST,
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_SUCCESS,
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_FAIL,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_REQUEST,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_SUCCESS,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_FAIL,
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

export const listSubCategoriesByCategoryId = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_LIST_BY_CATEGORY_ID_REQUEST });

    const { data } = await axios.get(`/api/subcategory/catId/${id}`);

    dispatch({
      type: SUB_CATEGORY_LIST_BY_CATEGORY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_BY_CATEGORY_ID_FAIL,
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

export const createSubCategoryByCategory =
  (subcategory) => async (dispatch, getState) => {
    try {
      const { name, description, selectedCategoryId } = subcategory;
      console.log(subcategory);
      console.log(
        "EXEC createSubCategoryByCategory from subCategoryAction , name: " +
          name +
          " description : " +
          description +
          " , category : " +
          selectedCategoryId
      );
      dispatch({
        type: SUB_CATEGORY_CREATE_BY_CATEGORY_ID_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/subcategory`,
        {
          name,
          description,
          category: selectedCategoryId,
          imageUrl: "",
        },
        config
      );

      dispatch({
        type: SUB_CATEGORY_CREATE_BY_CATEGORY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: SUB_CATEGORY_CREATE_BY_CATEGORY_ID_FAIL,
        payload: message,
      });
    }
  };

export const updateSubCategory =
  (id, name, description) => async (dispatch, getState) => {
    try {
      console.log("exec updateSubCategory from my subCategoryAction");
      dispatch({
        type: SUB_CATEGORY_UPDATE_REQUEST,
      });
      console.log(id, name, description);
      const { data } = await axios.put(`/api/subcategory/${id}`, {
        name,
        description,
      });

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
