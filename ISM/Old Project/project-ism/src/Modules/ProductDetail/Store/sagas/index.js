import * as Actions from "../constants";
import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";

// @service
import { createCart, getListCart, deleteItemCart } from "../service";

// @antd
import notification from "antd/es/notification";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

function* fetchDataCart({ payload }) {
  try {
    // yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(getListCart, payload);
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({ type: Actions.SET_DATA_CART, payload: data.retData });
    }
  } catch (err) {
    console.log("ERROR!", err);
    yield put({ type: Actions.SET_ERROR_CART, payload: err });
  } finally {
    // yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

function* fetchCreateCart({ payload }) {
  try {
    yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(createCart, payload);
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({
        type: Actions.GET_DATA_CART,
        payload: {
          userId: data?.retData?.userId,
        },
      });
      notification.success({
        message: "Successfully",
        description: "Create successfully",
        duration: 3,
      });
    } else {
      yield put({
        type: Actions.SET_ERROR_CART,
        payload: "Create unsuccessfully",
      });
      notification.error({
        message: "Fail",
        description: "Create unsuccessfully",
        duration: 3,
      });
    }
  } catch (err) {
    console.log("ERROR", err);
    yield put({ type: Actions.SET_ERROR_CART, payload: err });
  } finally {
    yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

function* fetchDeleteCart({ payload }) {
  try {
    yield put({ type: Actions.SET_LOADING_CART, payload: true });
    const res = yield call(deleteItemCart, payload);
    const { data } = res;
    if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
      yield put({
        type: Actions.GET_DATA_CART,
        payload: {
          userId: data?.retData?.userId,
        },
      });
      notification.success({
        message: "Successfully",
        description: "Delete successfully",
        duration: 3,
      });
    } else {
      yield put({
        type: Actions.SET_ERROR_CART,
        payload: "Delete unsuccessfully",
      });
      notification.error({
        message: "Fail",
        description: "Delete unsuccessfully",
        duration: 3,
      });
    }
  } catch (err) {
    console.log("Error!", err);
    yield put({ type: Actions.SET_ERROR_CART, payload: err });
  } finally {
    yield put({ type: Actions.SET_LOADING_CART, payload: false });
  }
}

export default function* cartSaga() {
  yield takeEvery(Actions.CREATE_CART, fetchCreateCart);
  yield takeEvery(Actions.DELETE_CART, fetchDeleteCart);
  yield takeLatest(Actions.GET_DATA_CART, fetchDataCart);
}
