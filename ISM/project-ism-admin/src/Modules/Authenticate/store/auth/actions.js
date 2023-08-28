import * as Actions from "./constants"

export function authSignIn(payload) {
  return {
    type: Actions.CALL_SIGN_IN_METHOD,
    payload
  }
}
export function setUserDataAuth(payload) {
  return {
    type: Actions.SIGN_IN_SUCCESS,
    payload
  }
}

export function authLogout(payload) {
  return {
    type: Actions.CALL_LOGOUT_METHOD,
    payload
  }
}
export function authLogoutSuccess(payload) {
  return {
    type: Actions.CALL_LOGOUT_METHOD_SUCCESS,
    payload
  }
}

export function signInReset(payload) {
  return {
    type: Actions.SIGN_IN_RESET,
    payload
  }
}
export function updateUserInfoAuth(payload) {
  return {
    type: Actions.UPDATE_USER_INFO_AUTH,
    payload
  }
}
