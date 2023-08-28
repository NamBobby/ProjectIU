import API from "../../configs/api"
import apiMethod from "@utility/ApiMethod"
import { APP_ID } from "../../../../configs/contants"

export const formSignUpCallMethod = ({ payload, codeLanguage }) => {
  const { otpSetup } = payload
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
    inviteUserCode: payload?.codeInvite || undefined
  }

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
    inviteUserCode: payload?.codeInvite || undefined
    // otp: payload?.otp,
  }

  delete bodyWithoutOTP.otpSetup

  if (otpSetup === "firebase") {
    bodyWithoutOTP.uid = payload.uid
    bodyWithoutOTP.token = payload.token
  }

  console.log("payload_register", payload)

  return apiMethod.post(
    codeLanguage +
      `${
        otpSetup === "otp"
          ? API.POST_SIGN_UP_TRIAL_ACCOUNT_OTP
          : API.POST_SIGN_UP_TRIAL_ACCOUNT
      }`,
    otpSetup === "otp" ? { ...bodyWithOpt } : { ...bodyWithoutOTP }
  )
}
