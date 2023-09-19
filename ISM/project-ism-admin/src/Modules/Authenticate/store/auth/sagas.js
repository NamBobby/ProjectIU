import React from "react";
import { put, call, takeEvery, select } from "redux-saga/effects";
import * as Actions from "./constants";
import * as ActionsAuth from "../auth/actions";
import { signIn } from "./service";
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";
import { getCodeLanguage } from "@store/common/selectors";
import apiMethod from "@utility/ApiMethod";
import apiMethodV2 from "@utility/ApiMethodV2";
import { getUserData } from "../../../../store/user/selector";
import { actions as userActions } from "../../../../store/user/reducer";

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */
function* fetchSignInSaga({ payload }) {
  try {
    const codeLanguage = yield select(getCodeLanguage);
    const res = yield call(signIn, {
      payload,
      codeLanguage,
    });
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      apiMethod.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.token}`;
      apiMethodV2.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.token}`;
      yield put({ type: Actions.SIGN_IN_SUCCESS, payload: data.data });
      yield put(userActions.setInfoData(data.data));
    } else {
      yield put({ type: Actions.SIGN_IN_ERROR, error: data.retText });
    }
  } catch (e) {
    console.log("LOGIN ERR", e);
    yield put({ type: Actions.SIGN_IN_ERROR, error: e });
  }
}

function* fetchLogoutSaga() {
  try {
    const userData = yield select(getUserData);
    yield put(userActions.clearUserData({}));

    yield put(ActionsAuth.authLogoutSuccess({}));
  } catch (err) {
    console.log("LOGOUT ERR", err);
  }
}

export default function* authSaga() {
  yield takeEvery(Actions.CALL_SIGN_IN_METHOD, fetchSignInSaga);
  yield takeEvery(Actions.CALL_LOGOUT_METHOD, fetchLogoutSaga);
}
