export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const setUserInfo = (user) => {
  localStorage.setItem("user_info", JSON.stringify(user));
};

export const setImportStatus = (importStatus) => {
  localStorage.setItem("import_status", importStatus);
};

export const getUserInfo = (user) => {
  return JSON.parse(localStorage.getItem("user_info"));
};

export const setPermissionsUserInfo = (permissions) => {
  localStorage.setItem("permissions", JSON.stringify(permissions));
};

export const getPermissionsUserInfo = (permissions) => {
  return JSON.parse(localStorage.getItem("permissions"));
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const checkLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token !== null && token !== undefined) {
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_info");
  localStorage.removeItem("persist:root");
  // window.location.href = "/"
  return true;
};

// New
export const setAccessToken = async (token) => {
  await localStorage.setItem("accessToken", token);
};
