import API from '../../configs/api'
import apiMethod from '@utility/ApiMethod'

export const formForgotUsernameCallMethod = ({payload}) => {
    return apiMethod.post(API.POST_AUTH_FORGOT_USERNAME, {
      phone: payload.number_phone_or_email
    })
}