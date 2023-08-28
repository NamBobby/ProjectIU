import API from "../configs/api";
import apiMethod from "@utility/ApiMethod";

export const getListProducts = (payload) => {
  return apiMethod.post(API.GET_LIST_PRODUCTS, payload);
};

export const deleteProduct = ({ payload }) => {
  // const { id } = payload || {};
  return apiMethod.delete(API.DELETE_PRODUCT + `/${payload}`);
};

export const uploadImgProduct = (payload) => {
  return apiMethod.post(API.UPLOAD_PRODUCT, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createProduct = (payload) => {
  return apiMethod.post(API.CREATE_PRODUCT, payload);
};

export const getDetailProduct = (payload) => {
  const { idProduct } = payload || {};
  return apiMethod.get(API.DETAIL_PRODUCT + `/${idProduct}`);
};

export const updateProduct = (payload) => {
  const { idProduct, ...rest } = payload || {};
  return apiMethod.put(API.UPDATE_PRODUCT + `/${idProduct}`, { ...rest });
};
