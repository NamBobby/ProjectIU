import { put, takeEvery, select } from "redux-saga/effects";
import * as Actions from "./constants";
import { formSubmitDataResponseSelector } from "../../../Authenticate/store/formVerifyAccount/selector";
import { formSubmitDataResponseSelector as formSubmitDataVerifyAccountEmailResponseSelector } from "../../../Authenticate/store/formVerifyAccountEmail/selector";

function* getAccountList({ payload }) {
	console.log("payload", payload);
	try {
		if (payload) {
			const list = yield select(formSubmitDataResponseSelector);
			yield put({ type: Actions.SET_ACCOUNT_LIST, payload: list });
		} else {
			const list1 = yield select(
				formSubmitDataVerifyAccountEmailResponseSelector,
			);
			yield put({ type: Actions.SET_ACCOUNT_LIST, payload: list1 });
		}
	} catch (e) {
		console.log(e);
	}
}

export default function* accountListSaga() {
	yield takeEvery(Actions.GET_ACCOUNT_LIST, getAccountList);
}
