import API from "../configs/api";
import apiMethod from "@utility/ApiMethod";

export const signIn = ({ payload }) => {
  return apiMethod.post(API.SIGN_IN_ACCOUNT, payload);
};
