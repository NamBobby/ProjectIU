import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";

export const getHomeData = async (codeLanguage = "vi-VN") => {
  try {
    const { data } = await apiMethod.get(`/${codeLanguage}/${API.GET_BANNER}`);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createOrder = (payload) => {
  return apiMethod.post(API.CREATE_ORDER, payload);
};

export const getDetailOrder = (payload) => {
  const { orderId } = payload || {};
  return apiMethod.get(API.GET_DETAIL_ORDER + `/${orderId}`);
};

export const deleteDetailOrder = (payload) => {
  const { orderId } = payload || {};
  return apiMethod.delete(API.DELETE_DETAIL_ORDER + `/${orderId}`);
};

export const sendEmailConfirm = (payload) => {
  return apiMethod.post(API.SEND_EMAIL_CONFIRM, payload);
};
