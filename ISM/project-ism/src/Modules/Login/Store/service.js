import API from "../configs/api";
import apiMethod from "@utility/ApiMethod";

export const signIn = (payload) => {
  const { username, password } = payload || {};
  return apiMethod.post(API.SIGN_IN, { username, password });
};

export const signUp = (payload) => {
  return apiMethod.post(API.SIGN_UP, payload);
};

export const confirmActiveAccount = (payload) => {
  return apiMethod.post(API.CONFIRM_ACTIVE_ACCOUNT, payload);
};
