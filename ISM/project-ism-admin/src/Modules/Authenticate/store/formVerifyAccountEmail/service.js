import API from "../../configs/api";
import apiMethod from "@utility/ApiMethod";
import { APP_ID } from "@configs/contants";

export const formVerifyAccountEmailCallMethod = ({ payload }) => {
	if (payload.type === "forgotUsername") {
		return apiMethod.post(API.POST_AUTH_VERIFY_ACCOUNT_EMAIL, {
			email: payload.email,
			otp: payload.otp,
			appId: APP_ID,
		});
	} else {
		return apiMethod.post(API.POST_AUTH_VERIFY_PASSWORD_EMAIL, {
			email: payload.email,
			otp: payload.otp,
			userName: payload.userName,
			appId: APP_ID,
		});
	}
};
