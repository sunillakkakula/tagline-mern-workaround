import {
  DOMESTIC_LIST_REQUEST,
  DOMESTIC_LIST_SUCCESS,
  DOMESTIC_LIST_FAIL,
  DOMESTIC_LIST_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_LIST_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_LIST_BY_PRODUCT_ID_FAIL,
  DOMESTIC_DELETE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_DELETE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_DELETE_BY_PRODUCT_ID_FAIL,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_UPDATE_BY_PRODUCT_ID_FAIL,
  DOMESTIC_CREATE_BY_PRODUCT_ID_REQUEST,
  DOMESTIC_CREATE_BY_PRODUCT_ID_SUCCESS,
  DOMESTIC_CREATE_BY_PRODUCT_ID_FAIL,
} from "../constants/domesticConstants";

export const domesticListReducer = (state = { domestic: [] }, action) => {
  switch (action.type) {
    case DOMESTIC_LIST_REQUEST:
      return { ...state, loading: true };
    case DOMESTIC_LIST_SUCCESS:
      return { loading: false, domestic: action.payload };
    case DOMESTIC_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const domesticListByProductIdReducer = (
  state = { domestic: [] },
  action
) => {
  switch (action.type) {
    case DOMESTIC_LIST_BY_PRODUCT_ID_REQUEST:
      return { ...state, loading: true };
    case DOMESTIC_LIST_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, domestic: action.payload };
    case DOMESTIC_LIST_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const domesticDeleteByProductIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DOMESTIC_DELETE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case DOMESTIC_DELETE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true };
    case DOMESTIC_DELETE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const domesticCreateByProductIdReducer = (state = {}, action) => {
  switch (action.type) {
    case DOMESTIC_CREATE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case DOMESTIC_CREATE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true, domestic: action.payload };
    case DOMESTIC_CREATE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//comemt
export const domesticUpdateByProductIdReducer = (
  state = { domestic: {} },
  action
) => {
  switch (action.type) {
    case DOMESTIC_UPDATE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case DOMESTIC_UPDATE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true, domestic: action.payload };
    case DOMESTIC_UPDATE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
