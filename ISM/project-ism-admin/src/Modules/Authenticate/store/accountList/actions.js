import * as Actions from "./constants";

export function getAccountList({ payload }) {
	return {
		type: Actions.GET_ACCOUNT_LIST,
		payload,
	};
}
export function clearAccountList() {
	return {
		type: Actions.CLEAR_ACCOUNT_LIST,
	};
}
