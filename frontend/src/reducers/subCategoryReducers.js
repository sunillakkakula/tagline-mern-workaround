import {
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_DELETE_REQUEST,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_DELETE_FAIL,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_REQUEST,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_SUCCESS,
  SUB_CATEGORY_CREATE_BY_CATEGORY_ID_FAIL,
  SUB_CATEGORY_CREATE_REQUEST,
  SUB_CATEGORY_UPDATE_REQUEST,
  SUB_CATEGORY_UPDATE_SUCCESS,
  SUB_CATEGORY_UPDATE_FAIL,
  SUB_CATEGORY_UPDATE_RESET,
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_REQUEST,
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_SUCCESS,
  SUB_CATEGORY_LIST_BY_CATEGORY_ID_FAIL,
} from "../constants/subCategoryConstants";

export const subCategoryListReducer = (
  state = { subcategories: [] },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_REQUEST:
      return { loading: true, subcategories: [] };
    case SUB_CATEGORY_LIST_SUCCESS:
      return { loading: false, subcategories: action.payload };
    case SUB_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryListByCategoryIdReducer = (
  state = { subcategories: [] },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_BY_CATEGORY_ID_REQUEST:
      return { loading: true, subcategories: [] };
    case SUB_CATEGORY_LIST_BY_CATEGORY_ID_SUCCESS:
      return { loading: false, subcategories: action.payload };
    case SUB_CATEGORY_LIST_BY_CATEGORY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const subCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case SUB_CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUB_CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUB_CATEGORY_CREATE_BY_CATEGORY_ID_REQUEST:
      return { loading: true };
    case SUB_CATEGORY_CREATE_BY_CATEGORY_ID_SUCCESS:
      return { loading: false, success: true, subcategory: action.payload };
    case SUB_CATEGORY_CREATE_BY_CATEGORY_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subCategoryUpdateReducer = (
  state = { subCategory: {} },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case SUB_CATEGORY_UPDATE_SUCCESS:
      return {
        loading: false,
        success_subcat_update: true,
        subCategory: action.payload,
      };
    case SUB_CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUB_CATEGORY_UPDATE_RESET:
      return { subCategory: {} };
    default:
      return state;
  }
};
