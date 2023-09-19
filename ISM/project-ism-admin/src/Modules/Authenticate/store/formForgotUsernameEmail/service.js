import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";
import { APP_ID } from "@configs/contants";

export const formForgotUsernameEmailCallMethod = ({ payload }) => {
	return apiMethod.post(API.POST_AUTH_FORGOT_USERNAME_EMAIL, {
		email: payload.number_phone_or_email,
		appId: APP_ID,
	});
};
