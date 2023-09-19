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

export const getListProducts = (payload) => {
  const { page, size } = payload || {};
  return apiMethod.post(API.GET_LIST_PRODUCTS, { page, size });
};

export const getListNews = (payload) => {
  const { page, size } = payload || {};
  return apiMethod.post(API.GET_LIST_NEWS, { page, size });
};

export const getDetailNews = (payload) => {
  const { idNews } = payload || {};
  return apiMethod.get(API.GET_DETAIL_NEWS + `/${idNews}`);
};
