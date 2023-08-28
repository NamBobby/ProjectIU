import * as Actions from "./constants";

export function setLanguage(payload) {
  return {
    type: Actions.SET_LANGUAGE,
    payload,
  };
}
export function getProvince() {
  return {
    type: Actions.GET_PROVICE,
  };
}

export function getDistrict(payload) {
  return {
    type: Actions.GET_DISTRICT,
    payload,
  };
}

export const getShareInfo = () => {
  return {
    type: Actions.GET_SHARE_INFO_REQUEST,
  };
};

export function getSchoolClass() {
  console.log("get");
  return {
    type: Actions.GET_SCHOOL_CLASS,
  };
}
