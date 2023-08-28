import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import * as Actions from "./constants";

const initState = {
	list: [],
};

const AccountListReducer = (state = initState, action = {}) => {
	switch (action.type) {
		case Actions.SET_ACCOUNT_LIST:
			return { ...state, list: action.payload };
		case Actions.CLEAR_ACCOUNT_LIST:
			return { ...state, list: [] };
		default:
			return state;
	}
};

const persistConfig = {
	key: "AccountList",
	storage,
	blacklist: ["loading", "error"],
};

export default persistReducer(persistConfig, AccountListReducer);
