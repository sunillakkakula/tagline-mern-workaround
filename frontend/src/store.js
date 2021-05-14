import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  subCategoryListReducer,
  subCategoryListByCategoryIdReducer,
  subCategoryDeleteReducer,
  subCategoryCreateReducer,
  subCategoryUpdateReducer,
} from "./reducers/subCategoryReducers";
import {
  categoryListReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  categoryDetailsByIdReducer,
} from "./reducers/categoryReducers";
import {
  productListReducer,
  productListBySubCategoryReducer,
  productDetailsBySubCategoryIdProductIdReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productDetailsByProductIdReducer,
  productBestSellerReducer,
  productListByCategoryIdReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  bulkListReducer,
  bulkCreateByProductIdReducer,
  bulkDeleteByProductIdReducer,
  bulkUpdateByProductIdReducer,
  bulkListByProductIdReducer,
} from "./reducers/bulkReducers";
import {
  domesticListReducer,
  domesticCreateByProductIdReducer,
  domesticDeleteByProductIdReducer,
  domesticUpdateByProductIdReducer,
  domesticListByProductIdReducer,
} from "./reducers/domesticReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  subCategoryList: subCategoryListReducer,
  subCategoryListByCategory: subCategoryListByCategoryIdReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  subCategoryUpdate: subCategoryUpdateReducer,
  subCategoryCreate: subCategoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDetailsById: categoryDetailsByIdReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  productList: productListReducer,
  productListByCategory: productListByCategoryIdReducer,
  productListBySubCategory: productListBySubCategoryReducer,
  productDetailsBySubCategoryIdProductId: productDetailsBySubCategoryIdProductIdReducer,
  productDetailsByProductId: productDetailsByProductIdReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  bestSellers: productBestSellerReducer,
  bulkList: bulkListReducer,
  bulkCreateByProductId: bulkCreateByProductIdReducer,
  bulkDeleteByProductId: bulkDeleteByProductIdReducer,
  bulkUpdateByProductId: bulkUpdateByProductIdReducer,
  bulkListByProductId: bulkListByProductIdReducer,
  domesticList: domesticListReducer,
  domesticCreateByProductId: domesticCreateByProductIdReducer,
  domesticDeleteByProductId: domesticDeleteByProductIdReducer,
  domesticUpdateByProductId: domesticUpdateByProductIdReducer,
  domesticListByProductId: domesticListByProductIdReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
