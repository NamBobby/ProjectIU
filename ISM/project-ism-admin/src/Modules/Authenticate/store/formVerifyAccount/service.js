import API from "../../configs/api"
import apiMethod from "@utility/ApiMethod"

export const formVerifyAccountCallMethod = ({ payload }) => {
  if (payload.type === "forgotUsername") {
    return apiMethod.post(API.POST_AUTH_VERIFY_ACCOUNT, {
      phone: payload.phone,
      otp: payload.otp
    })
  } else {
    return apiMethod.post(API.POST_AUTH_VERIFY_PASSWORD, {
      phone: payload.phone,
      otp: payload.otp,
      userName: payload.userName
    })
  }
}
