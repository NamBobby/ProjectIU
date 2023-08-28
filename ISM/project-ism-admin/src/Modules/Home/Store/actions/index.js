import * as Actions from '../constants';

export const getDataHomeAction = (payload) => {
  return {
    type: Actions.GET_DATA_HOME_REQUEST,
    payload,
  };
};
