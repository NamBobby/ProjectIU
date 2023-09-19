import * as Actions from "../constants";

export const createCart = (payload) => {
  return {
    type: Actions.CREATE_CART,
    payload,
  };
};

export function getListCart(payload) {
  return {
    type: Actions.GET_DATA_CART,
    payload,
  };
}

export function setListCart(payload) {
  return {
    type: Actions.SET_DATA_CART,
    payload,
  };
}

export function deleteItemCart(payload) {
  return {
    type: Actions.DELETE_CART,
    payload,
  };
}

export function resetCart(payload) {
  return {
    type: Actions.RESET_CART,
    payload,
  };
}
