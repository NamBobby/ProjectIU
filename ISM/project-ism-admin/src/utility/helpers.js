export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
  return true;
};
