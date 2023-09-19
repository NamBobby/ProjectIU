import API from '../../configs/api'
import apiMethod from '@utility/ApiMethod'

export const formForgotPasswordCallMethod = ({payload}) => {
  const body = {
    userName: payload.username,
    phone: payload.number_phone_or_email
  }
  return apiMethod.post(API.POST_AUTH_FORGOT_PASSWORD, body)
}
