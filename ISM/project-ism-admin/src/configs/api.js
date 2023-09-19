import {
  ENV_ENVIRONMENT_BASE_URL_API,
  ENV_ENVIRONMENT_BASE_URL_API_DEV,
  ENV_ENVIRONMENT_BASE_URL_V2_API,
} from "./environment";
export const BASE_URL_API = ENV_ENVIRONMENT_BASE_URL_API;
export const BASE_URL_API_DEV = ENV_ENVIRONMENT_BASE_URL_API_DEV;
export const BASE_URL_V2_API = ENV_ENVIRONMENT_BASE_URL_V2_API;

export default {
  /*Basic*/
  Province: "/Province",
  District: "/District",
  SchoolClass: "/SchoolClass",

  /*Common*/
  GET_COMMON_GET_CITY: "/Province",
  GET_COMMON_GET_DISTRICT: "/District",
  GET_LIST_CLASS: "/SchoolClass",
  GET_SHARE_INFO: "WebsiteSTNHD/ShareInfo",
  GET_LIST_OPTIONS_SETUP: "Options/list/otp_setup",
  POST_SEND_OTP_EMAIL: "/AccountHelperEmail/SendOTPEmail",

  POST_CHECK_ACTIVE_CLASS_CODE: "/SieuTriNhoHocDuong/CheckCode5PTB",
  POST_ACTIVE_CLASS_CODE: "/SieuTriNhoHocDuong/ActiveCode5PTB",

  /*End Common*/
};
