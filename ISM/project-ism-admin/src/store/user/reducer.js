import { createAction, handleActions } from "redux-actions"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

export const types = {
  GET_INFO_USER: "SuperSchoolMemory/user/GET_INFO_USER",
  SET_USER_DATA: "SuperSchoolMemory/user/SET_USER_DATA",
  SET_LOADING: "SuperSchoolMemory/user/SET_LOADING",
  CLEAR_DATA: "SuperSchoolMemory/user/CLEAR_DATA"
  // GET_GENERAL_INFO_MENU: "SuperSchoolMemory/user/GET_GENERAL_INFO_MENU",
  // SET_GENERAL_INFO_MENU: "SuperSchoolMemory/user/SET_GENERAL_INFO_MENU"
}

export const actions = {
  setLoading: createAction(types.SET_LOADING),
  setInfoData: createAction(types.SET_USER_DATA),
  getInfoUser: createAction(types.GET_INFO_USER),
  clearUserData: createAction(types.CLEAR_DATA)
  // setGeneralInfoMenuLoading: createAction(types.SET_LOADING),
  // setGeneralInfoMenu: createAction(types.SET_GENERAL_INFO_MENU),
  // getGeneralInfoMenu: createAction(types.GET_GENERAL_INFO_MENU)
}

const defaultState = {
  userData: {},
  loading: false,
  error: ""
  // generalInfoMenu: null
}

const UserReducer = handleActions(
  {
    [types.SET_USER_DATA]: (state, { payload }) => {
      return { ...state, userData: { ...payload } }
    },
    [types.SET_LOADING]: (state, { payload }) => {
      return { ...state, loading: payload }
    },
    [types.CLEAR_DATA]: (state, { payload }) => {
      return defaultState
    }
    // [types.SET_GENERAL_INFO_MENU]: (state, { payload }) => {
    //   console.log("GENERAL INFO", payload)
    //   return { ...state, generalInfoMenu: payload }
    // }
  },
  defaultState
)

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["loading", "error"]
}

export default persistReducer(persistConfig, UserReducer)
