import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";

export const getDetailProduct = (payload) => {
  const { id } = payload || {};
  return apiMethod.get(API.GET_DETAIL_PRODUCT + `/${id}`);
};

export const createCart = (payload) => {
  const { userId, cartProduct } = payload || {};
  return apiMethod.post(API.CREATE_CART, { userId, cartProduct });
};

export const getListCart = (payload) => {
  // console.log("payload", payload);
  const { userId } = payload || {};
  return apiMethod.post(API.GET_LIST_CART, { userId });
};

export const deleteItemCart = (payload) => {
  return apiMethod.post(API.DELETE_ITEM_CART, payload);
};
