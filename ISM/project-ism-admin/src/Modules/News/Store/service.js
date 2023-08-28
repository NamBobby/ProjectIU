import API from "../configs/api";
import apiMethod from "@utility/ApiMethod";

export const createNews = (payload) => {
  return apiMethod.post(API.CREATE_NEWS, payload);
};

export const getDetailNews = (payload) => {
  const { idNews } = payload || {};
  return apiMethod.get(API.GET_DETAIL_NEWS + `/${idNews}`);
};

export const updateDetailNews = (payload) => {
  const { idNews, ...rest } = payload || {};
  return apiMethod.put(API.UPDATE_DETAIL_NEWS + `/${idNews}`, { ...rest });
};

export const deleteDetailNews = (payload) => {
  const { idNews } = payload || {};
  return apiMethod.delete(API.DELETE_DETAIL_NEWS + `/${idNews}`);
};

export const getListNews = (payload) => {
  return apiMethod.post(API.GET_LIST_NEWS, payload);
};
