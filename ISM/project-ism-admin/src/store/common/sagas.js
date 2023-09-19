import * as Actions from "./constants";

import { put, call, takeEvery, select } from "redux-saga/effects";
import { getCodeLanguage } from "@store/common/selectors";
import {
  getProvince,
  getDistrict,
  getSchoolClass,
  getShareInfoData,
} from "./services";
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */

function* getDataShareInfo() {
  try {
    const codeLanguage = yield select(getCodeLanguage);
    const res = yield call(getShareInfoData, codeLanguage);
    yield put({ type: Actions.GET_SHARE_INFO_SUCCESS, payload: res });
  } catch (e) {
    yield put({ type: Actions.GET_SHARE_INFO_FAILED, error: e });
  }
}

function* fetchProvince() {
  try {
    const res = yield call(getProvince);
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({ type: Actions.SET_BASIC_DATA_SUCCESS, province: data.data });
    } else {
      yield put({ type: Actions.ERROR, error: data.retText });
    }
  } catch (e) {
    yield put({ type: Actions.ERROR, error: e });
  }
}

function* fetchDistrict({ payload }) {
  try {
    const res = yield call(getDistrict, { ProvinceId: payload });
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({ type: Actions.SET_BASIC_DATA_SUCCESS, district: data.data });
    } else {
      yield put({ type: Actions.ERROR, error: data.retText });
    }
  } catch (e) {
    yield put({ type: Actions.ERROR, error: e });
  }
}

function* fetchSchoolClass() {
  console.log("hihi");
  try {
    const res = yield call(getSchoolClass);
    console.log("res", res);
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({
        type: Actions.SET_BASIC_DATA_SUCCESS,
        schoolClass: data.data,
      });
    } else {
      yield put({ type: Actions.ERROR, error: data.retText });
    }
  } catch (e) {
    console.log("er", e);
    yield put({ type: Actions.ERROR, error: e });
  }
}

export default function* commonSaga() {
  yield takeEvery(Actions.GET_SHARE_INFO_REQUEST, getDataShareInfo);
  yield takeEvery(Actions.GET_PROVICE, fetchProvince);
  yield takeEvery(Actions.GET_DISTRICT, fetchDistrict);
  yield takeEvery(Actions.GET_SCHOOL_CLASS, fetchSchoolClass);
}
