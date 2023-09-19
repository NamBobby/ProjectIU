import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";

export const getListOrderClient = (payload) => {
  return apiMethod.post(API.GET_LIST_ORDER_CLIENT, payload);
};

export const updateInfoUser = (payload) => {
  const { userId, ...rest } = payload || {};
  return apiMethod.put(API.UPDATE_INFO_USER + `/${userId}`, rest);
};
