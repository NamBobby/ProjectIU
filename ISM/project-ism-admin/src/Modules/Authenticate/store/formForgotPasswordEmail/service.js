import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";
import { APP_ID } from "@configs/contants";

export const formForgotPasswordEmailCallMethod = ({ payload }) => {
	const body = {
		userName: payload.username,
		email: payload.number_phone_or_email,
		appId: APP_ID,
	};
	return apiMethod.post(API.POST_AUTH_FORGOT_PASSWORD_EMAIL, body);
};
