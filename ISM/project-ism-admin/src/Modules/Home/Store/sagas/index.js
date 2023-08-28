import * as Actions from '../constants';
import { getHomeData } from '../service';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { getCodeLanguage } from '@store/common/selectors';

function* getDataHome() {
  try {
    const codeLanguage = yield select(getCodeLanguage);
    const res = yield call(getHomeData, codeLanguage);
    const { data } = res;
    if (res.retCode === 0) {
      yield put({ type: Actions.GET_DATA_HOME_SUCCESS, payload: data });
    } else {
      yield put({ type: Actions.GET_DATA_HOME_FAILED, error: res.retText });
    }
  } catch (e) {
    yield put({ type: Actions.GET_DATA_HOME_FAILED, error: e });
  }
}

export default function* homeSaga() {
  yield takeEvery(Actions.GET_DATA_HOME_REQUEST, getDataHome);
}
