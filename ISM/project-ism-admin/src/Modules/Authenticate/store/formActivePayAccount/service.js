import apiMethod from "../../../../utility/ApiMethod";
import API from "../../../../configs/api";
import moment from "moment";
// export const formActivePayAccountSuperSchoolMemoryCallMethod = ({
// 	payload,
// 	codeLanguage,
// }) => {
// 	return apiMethod.post(codeLanguage + API.POST_ACTIVE_CODE, {
// 		cardNo: payload.active_code,

// 		// userId: parseInt(payload.userId),

// 		// userName: payload.user_name,

// 		fullName: payload.parent_fullname,

// 		// childFullName1: payload.children_fullname,
// 		child1_SchoolName: payload.school_name,
// 		child1_ClassId: `${payload.class}` || "",

// 		cityId: `${payload.city}`,
// 		// districtId: `${payload.district}`,
// 		// address: payload.street_address,
// 		child1_GradeId: `${payload.class}` || "",
// 		classId: `${payload.class}` || "",
// 		ClassId: `${payload.class}` || "",
// 		gradeId: `${payload.class}` || "",
// 		GradeId: `${payload.class}` || "",
// 		gradeid: `${payload.class}` || "",
// 		email: payload.email,
// 		phone: `${payload.phone_number}`.replace("84", "0"),
// 		otp: `${payload.verify_code}`,
// 		avartar: payload?.avartar,
// 		genderCode: payload?.gender,
// 		dayofbirth: moment(payload?.birth_day, "DD/MM/YYYY").format(),
// 	});
// };
// export const getFreeTrialAccountInfo = ({ payload, codeLanguage }) => {
// 	return apiMethod.post(codeLanguage + API.GET_TRIAL_ACCOUNT_INFO, {
// 		...payload,
// 	});
// };
// export const getProfileUser = ({ payload, codeLanguage }) => {
// 	return apiMethod.post(codeLanguage + API.GET_PROFILE, {
// 		...payload,
// 	});
// };

// export const checkActiveCode = ({ payload, codeLanguage }) => {
// 	return apiMethod.post(codeLanguage + API.POST_CHECK_ACTIVE_CODE, {
// 		...payload,
// 	});
// };

// export const getTutorialVideo = ({ payload, codeLanguage }) => {
// 	return apiMethod.get(codeLanguage + API.GET_VIDEO_TUTORIAL_ACTIVE_CODE, {
// 		...payload,
// 	});
// };

export const postCheckActiveClassCode = ({ payload, codeLanguage }) => {
	return apiMethod.post(codeLanguage + API.POST_CHECK_ACTIVE_CLASS_CODE, {
		...payload,
	});
};

export const postActiveClassCode = ({ payload, codeLanguage }) => {
	return apiMethod.post(codeLanguage + API.POST_ACTIVE_CLASS_CODE, {
		...payload,
	});
};
export const getListClass = (payload) => {
	return apiMethod.get(API.GET_LIST_CLASS, {
		...payload,
	});
};
// export const sendOTP = ({ payload, codeLanguage }) => {
// 	return apiMethod.post(codeLanguage + API.POST_SEND_OTP, {
// 		...payload,
// 	});
// };
