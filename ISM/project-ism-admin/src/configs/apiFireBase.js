import {
	ENVIRONMENT_BASE_URL_API_FIRE_BASE,
	ENVIRONMENT_firebaseConfig,
} from "./environment";
export const BASE_URL_API = ENVIRONMENT_BASE_URL_API_FIRE_BASE;
export const FIREBASE_CONFIG = ENVIRONMENT_firebaseConfig;

export default {
	REGISTER_SETUP: "/register-setup",
	REFRESH_TOKEN: "/refresh-token",
	LOGIN: "/login",
	/*Notification*/
	POST_SAVE_NOTIFICATION_TOKEN: "/register-device-token",
	GET_NOTI_DETAILS: "/MstNotifications/datail",
	GET_COUNT_UNREAD_NOTI: "/MstNotifications/CountSeenFalse",
	GET_LIST_NOTI: "/MstNotifications/list",
	DELETE_NOTI: "/MstNotifications/delete",
	SET_READ_NOTI: "/MstNotifications/update",
	/*End Notification*/
};
