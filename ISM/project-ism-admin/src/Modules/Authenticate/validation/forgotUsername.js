import * as Yup from "yup";
import {
	messageError,
	emailOrPhoneRegex,
	phoneRegex,
	emailRegex,
} from "@utils";

export const getValueForm = (valuesDefault = {}) => {
	return {
		number_phone_or_email: "",
		...valuesDefault,
	};
};

export const validationSchema = (i18n, isActiveOTP) => {
	return Yup.object().shape({
		number_phone_or_email: isActiveOTP
			? Yup.string()
					.nullable()
					.required(
						messageError(
							i18n.t("validation:required"),
							i18n.t("FormForgotUsername:field:number_phone"),
						),
					)
					.matches(
						phoneRegex,
						messageError(
							i18n.t("validation:regex"),
							i18n.t("FormForgotUsername:field:number_phone"),
						),
					)
			: Yup.string()
					.nullable()
					.required(
						messageError(
							i18n.t("validation:required"),
							i18n.t("FormForgotUsername:field:email"),
						),
					)
					.matches(
						emailRegex,
						messageError(
							i18n.t("validation:regex"),
							i18n.t("FormForgotUsername:field:email"),
						),
					),
		// number_phone_or_email: Yup.string()
		// 	.nullable()
		// 	.required(
		// 		messageError(
		// 			i18n.t("validation:required"),
		// 			i18n.t("FormForgotPassword:field:number_phone_or_email"),
		// 		),
		// 	)
		// 	.matches(
		// 		emailOrPhoneRegex,
		// 		messageError(
		// 			i18n.t("validation:emailOrPhoneRegex"),
		// 			i18n.t("FormForgotPassword:field:number_phone_or_email"),
		// 		),
		// 	),
	});
};
