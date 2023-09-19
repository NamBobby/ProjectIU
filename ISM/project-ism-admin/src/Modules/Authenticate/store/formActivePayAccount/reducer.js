import { handleActions, createAction } from "redux-actions"
import { generateFormSubmitRedux } from "../../../../utility/StoreMethod"
const name = "formActivePayAccountSuperSchoolMemory"
const reduxFormGenerate = generateFormSubmitRedux(name)

export const types = {
  ...reduxFormGenerate.types,
  SET_ACTIVE_CODE: "SET_ACTIVE_CODE",
  SET_SUCCESS_NOTI: "SET_SUCCESS_NOTI",
  SET_USER_INFO: "SET_USER_INFO"
}

export const actions = {
  ...reduxFormGenerate.actions,
  setActiveCode: createAction(types.SET_ACTIVE_CODE),
  setSuccessNoti: createAction(types.SET_SUCCESS_NOTI),
  setUserInfo: createAction(types.SET_USER_INFO)
}

const defaultState = {
  ...reduxFormGenerate.defaultState,
  activeCode: null,
  successNoti: null,
  userInfo: null
}

export default handleActions(
  {
    ...reduxFormGenerate.handleActions,
    [types.SET_ACTIVE_CODE]: (state, { payload }) => {
      return {
        ...state,
        activeCode: payload
      }
    },
    [types.SET_SUCCESS_NOTI]: (state, { payload }) => {
      return {
        ...state,
        successNoti: payload
      }
    },
    [types.SET_USER_INFO]: (state, { payload }) => {
      return {
        ...state,
        userInfo: payload
      }
    }
  },
  defaultState
)
