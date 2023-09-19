import * as Actions from '../constants';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initState = {
  homeData: {},
  loading: false,
  error: '',
};

const HomeReducers = (state = initState, action = {}) => {
  switch (action.type) {
    case Actions.GET_DATA_HOME_REQUEST:
      return { ...state, loading: true };
    case Actions.GET_DATA_HOME_SUCCESS:
      return {
        ...state,
        homeData: action.payload,
        loading: false,
      };
    case Actions.GET_DATA_HOME_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

const persistConfig = {
  key: 'Home',
  storage,
  blacklist: ['loading', 'error'],
};

export default persistReducer(persistConfig, HomeReducers);
