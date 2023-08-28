import * as Yup from "yup";
import {
	messageError,
	emailOrPhoneRegex,
	phoneRegex,
	fullNameRegex,
} from "@utils";

export const getValueForm = (valuesDefault = {}) => {
	return {
		cardNo: "",
		gradeIdArr: [],
		email: "",
		// phone: "",
		// otp: null,
		...valuesDefault,
	};
};

export const validationSchema = (i18n, isActiveOTP) => {
	return Yup.object().shape({
		// activeCode: Yup.string()
		// 	.nullable()

		// 	.required(
		// 		messageError(
		// 			i18n.t("validation:required"),
		// 			i18n.t("FormActive:field:parent_fullname"),
		// 		),
		// 	),

		phone: Yup.string()
			.nullable()
			.matches(
				phoneRegex,
				messageError(
					i18n.t("validation:phone"),
					i18n.t("FormActive:field:phone_number"),
				),
			)
			.required(
				messageError(
					i18n.t("validation:required"),
					i18n.t("activeAccount:phone_number"),
				),
			),

		email: Yup.string()
			.nullable()
			.email(
				messageError(i18n.t("validation:email"), i18n.t("activeAccount:email")),
			)
			.required(
				messageError(
					i18n.t("validation:required"),
					i18n.t("activeAccount:email"),
				),
			),

		otp: !isActiveOTP
			? Yup.string().nullable()
			: Yup.string()
					.nullable()
					.required(
						messageError(
							i18n.t("validation:required"),
							i18n.t("activeLesson:verify_code"),
						),
					),
	});
};
