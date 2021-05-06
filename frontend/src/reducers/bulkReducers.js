import {
  BULK_LIST_REQUEST,
  BULK_LIST_SUCCESS,
  BULK_LIST_FAIL,
  BULK_LIST_BY_PRODUCT_ID_REQUEST,
  BULK_LIST_BY_PRODUCT_ID_SUCCESS,
  BULK_LIST_BY_PRODUCT_ID_FAIL,
  BULK_DELETE_BY_PRODUCT_ID_REQUEST,
  BULK_DELETE_BY_PRODUCT_ID_SUCCESS,
  BULK_DELETE_BY_PRODUCT_ID_FAIL,
  BULK_UPDATE_BY_PRODUCT_ID_REQUEST,
  BULK_UPDATE_BY_PRODUCT_ID_SUCCESS,
  BULK_UPDATE_BY_PRODUCT_ID_FAIL,
  BULK_CREATE_BY_PRODUCT_ID_REQUEST,
  BULK_CREATE_BY_PRODUCT_ID_SUCCESS,
  BULK_CREATE_BY_PRODUCT_ID_FAIL,
} from "../constants/bulkConstants";

export const bulkListReducer = (state = { bulk: [] }, action) => {
  switch (action.type) {
    case BULK_LIST_REQUEST:
      return { ...state, loading: true };
    case BULK_LIST_SUCCESS:
      return { loading: false, bulk: action.payload };
    case BULK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bulkListByProductIdReducer = (state = { bulk: [] }, action) => {
  switch (action.type) {
    case BULK_LIST_BY_PRODUCT_ID_REQUEST:
      return { ...state, loading: true };
    case BULK_LIST_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, bulk: action.payload };
    case BULK_LIST_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const bulkDeleteByProductIdReducer = (state = {}, action) => {
  switch (action.type) {
    case BULK_DELETE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case BULK_DELETE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true };
    case BULK_DELETE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bulkCreateByProductIdReducer = (state = {}, action) => {
  switch (action.type) {
    case BULK_CREATE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case BULK_CREATE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true, bulk: action.payload };
    case BULK_CREATE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bulkUpdateByProductIdReducer = (state = { bulk: {} }, action) => {
  switch (action.type) {
    case BULK_UPDATE_BY_PRODUCT_ID_REQUEST:
      return { loading: true };
    case BULK_UPDATE_BY_PRODUCT_ID_SUCCESS:
      return { loading: false, success: true, bulk: action.payload };
    case BULK_UPDATE_BY_PRODUCT_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
