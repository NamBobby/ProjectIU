import * as Actions from "../constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initState = {
  homeData: {},
  loading: false,
  error: "",
};

const CartReducers = (state = initState, action = {}) => {
  switch (action.type) {
    case Actions.SET_DATA_CART:
      return { ...state, dataCart: action.payload };

    case Actions.SET_LOADING_CART:
      return {
        ...state,
        loading: action.payload || false,
      };

    case Actions.SET_ERROR_CART:
      return {
        ...state,
        error: action.payload || null,
      };
    case Actions.SET_SUCCESS_CART:
      return {
        ...state,
        error: null,
        success: action.payload,
      };

    case Actions.RESET_CART:
      return initState;
    default: {
      return state;
    }
  }
};

const persistConfig = {
  key: "Cart",
  storage,
  blacklist: ["loading", "error", "success"],
};

export default persistReducer(persistConfig, CartReducers);
