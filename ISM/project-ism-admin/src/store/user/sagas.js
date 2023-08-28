import { select, call, put, takeLatest } from "redux-saga/effects"
import { actions, types } from "./reducer"
import * as service from "./service"
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants"
import { getCodeLanguage } from "../common/selectors"
import { updateUserInfoAuth } from "../../Modules/Authenticate/store/auth/actions"
import { userDataSelector } from "../../Modules/Authenticate/store/auth/selectors"

const getInfoUser = function* ({ payload }) {
  try {
    const userDateDef = yield select(userDataSelector)
    yield put(actions.setLoading(true))
    const codeLanguage = yield select(getCodeLanguage)
    const res = yield call(service.getInfoUser, { payload, codeLanguage })
    const { data } = res
    if (
      res.status === SUCCESS &&
      data.retCode === RETCODE_SUCCESS &&
      data.data
    ) {
      yield put(actions.setInfoData({ ...userDateDef, ...res.data.data }))

      yield put(updateUserInfoAuth(res?.data?.data || {}))
    } else {
      yield put(actions.setInfoData({}))
    }
  } catch (e) {
    console.error(e)
    yield put(actions.setInfoData({}))
  } finally {
    yield put(actions.setLoading(false))
  }
}

// const getInfoMenu = function* ({ payload }) {
//   try {
//     yield put(actions.setLoading(true))
//     const codeLanguage = yield select(getCodeLanguage)
//     const res = yield call(service.getGeneralInfoMenu, {
//       payload,
//       codeLanguage
//     })
//     const { data } = res
//     if (res.status === SUCCESS && data.retCode === RETCODE_SUCCESS) {
//       yield put(actions.setGeneralInfoMenu(res.data.data))
//     } else {
//       yield put(actions.setGeneralInfoMenu({}))
//     }
//   } catch (e) {
//     console.error(e)
//     yield put(actions.setGeneralInfoMenu({}))
//   } finally {
//     yield put(actions.setLoading(false))
//   }
// }

export default function* () {
  yield takeLatest(types.GET_INFO_USER, getInfoUser)
  // yield takeLatest(types.GET_GENERAL_INFO_MENU, getInfoMenu)
}
