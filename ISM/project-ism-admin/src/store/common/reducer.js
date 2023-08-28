import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import * as Actions from "./constants";

const initState = {
  language: "vi",
  codeLanguage: "vi-VN",
  shareInfo: {},
  province: [],
  district: [],
  schoolClass: [],
};

const CommonReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case Actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        codeLanguage: action.payload === "vi" ? "vi-VN" : "en-US",
        itemsLanguageSelect: action.payload,
      };
    case Actions.GET_SHARE_INFO_REQUEST:
      return { ...state, loading: true };
    case Actions.GET_SHARE_INFO_SUCCESS:
      return {
        ...state,
        shareInfo: action.payload,
        loading: false,
      };
    case Actions.SET_BASIC_DATA_SUCCESS:
      console.log("a", action);
      return { ...state, ...action };
    case Actions.GET_SHARE_INFO_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "common",
  storage,
};

export default persistReducer(persistConfig, CommonReducer);
