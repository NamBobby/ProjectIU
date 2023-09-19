import API from "../configs/api";
import apiMethod from "@utility/ApiMethod";

// new
export const getListOrders = (payload) => {
  return apiMethod.post(API.GET_LIST_ORDER, payload);
};

export const getDetailOrder = (payload) => {
  const { idOrder } = payload || {};
  return apiMethod.get(API.GET_DETAIL_ORDER + `/${idOrder}`);
};

export const deleteDetailOrder = (payload) => {
  const { idOrder } = payload || {};
  return apiMethod.delete(API.DELETE_DETAIL_ORDER + `/${idOrder}`);
};

export const updateDetailOrder = (payload) => {
  const { idOrder, ...rest } = payload || {};
  return apiMethod.put(API.UPDATE_DETAIL_ORDER + `/${idOrder}`, { ...rest });
};
