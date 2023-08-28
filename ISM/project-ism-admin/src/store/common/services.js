import API from "../../configs/api";
import apiMethod from "../../utility/ApiMethod";
import apiMethodDev from "../../utility/ApiMethodDev";

export const getProvince = () => {
  return apiMethod.get(API.Province);
};

export const getDistrict = ({ ProvinceId }) => {
  return apiMethod.get(API.District, {
    params: {
      ProvinceId,
    },
  });
};

export const getSchoolClass = () => {
  return apiMethod.get(API.SchoolClass);
};

export const getListCity = (payload) => {
  return apiMethod.get(API.GET_COMMON_GET_CITY, payload);
};

export const getListDistrict = (payload) => {
  return apiMethod.get(API.GET_COMMON_GET_DISTRICT, payload);
};

export const getShareInfoData = async (codeLanguage = "vi-VN") => {
  try {
    const { data } = await apiMethod.get(
      `/${codeLanguage}/${API.GET_SHARE_INFO}`
    );
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getOptionSetup = (payload) => {
  return apiMethod.get(API.GET_LIST_OPTIONS_SETUP, payload);
};

export const getOptionSetupDev = (payload) => {
  return apiMethodDev.get(API.GET_LIST_OPTIONS_SETUP, payload);
};

export const sendOtpEmail = (payload) => {
  return apiMethod.post(API.POST_SEND_OTP_EMAIL, {
    ...payload,
    appID: APP_ID,
  });
};
