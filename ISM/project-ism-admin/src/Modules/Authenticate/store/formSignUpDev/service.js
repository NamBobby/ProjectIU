import API from "../../configs/api";
import apiMethod from "@utility/ApiMethodDev";
import { APP_ID } from "../../../../configs/contants";

export const formSignUpDevCallMethod = ({ payload, codeLanguage }) => {
  const { otpSetup } = payload;
  const bodyWithOpt = {
    email: payload.username,
    password: payload.password,
    fullName: payload.parent_fullname,
    // childFullName1: payload.student_name,
    // child1_SchoolName: payload.school_name,
    child1_ClassId: parseInt(payload.class_name),
    cityId: parseInt(payload.city),
    districtId: parseInt(payload.district),
    address: payload.address,
    // email: payload.email,
    phone: payload?.phone,
    appID: APP_ID,
    otp: payload?.otp,
  };

  const bodyWithoutOTP = {
    email: payload.username,
    password: payload.password,
    fullName: payload.parent_fullname,
    // childFullName1: payload.student_name,
    // child1_SchoolName: payload.school_name,
    child1_ClassId: parseInt(payload.class_name),
    cityId: parseInt(payload.city),
    districtId: parseInt(payload.district),
    address: payload.address,
    // email: payload.email,
    phone: payload?.phone,
    appID: APP_ID,
    // otp: payload?.otp,
  };

  delete bodyWithoutOTP.otpSetup;

  if (otpSetup === "firebase") {
    bodyWithoutOTP.uid = payload.uid;
    bodyWithoutOTP.token = payload.token;
  }

  return apiMethod.post(
    codeLanguage +
      `${
        otpSetup === "otp"
          ? API.POST_SIGN_UP_TRIAL_ACCOUNT_OTP
          : API.POST_SIGN_UP_TRIAL_ACCOUNT
      }`,
    otpSetup === "otp" ? { ...bodyWithOpt } : { ...bodyWithoutOTP }
  );
};
