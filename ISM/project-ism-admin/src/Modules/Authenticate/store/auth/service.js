import API from "../../configs/api";

import apiMethod from "@utility/ApiMethod";
import apiMethodDev from "@utility/ApiMethodDev";
import { APP_ID } from "../../../../configs/contants";

export const signIn = ({ codeLanguage, payload }) => {
  return apiMethod.post(codeLanguage + API.POST_AUTH_SIGN_IN, {
    ...payload,
    appID: APP_ID,
  });
};

export const sendOtp = ({ codeLanguage, payload }) => {
  return apiMethod.post(codeLanguage + API.POST_SEND_OTP, {
    phoneNumber: payload,
  });
};

export const signInDev = ({ codeLanguage, payload }) => {
  return apiMethodDev.post(codeLanguage + API.POST_AUTH_SIGN_IN, {
    ...payload,
    appID: APP_ID,
  });
};

export const sendOtpDev = ({ codeLanguage, payload }) => {
  return apiMethodDev.post(codeLanguage + API.POST_SEND_OTP, {
    phoneNumber: payload,
  });
};
