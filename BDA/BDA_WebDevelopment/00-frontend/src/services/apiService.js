import axios from './axios.customize';

// User APIs
const createUserApi = async (name, email, password, dateOfBirth, gender) => {
  const URL_API = '/v1/api/register';
  const data = { name, email, password, dateOfBirth, gender };
  return await axios.post(URL_API, data);
};

const LoginApi = async (email, password) => {
  const URL_API = '/v1/api/login';
  const data = { email, password };
  return await axios.post(URL_API, data);
};

const getUserApi = async () => {
  const URL_API = '/v1/api/user';
  return await axios.get(URL_API);
};

const updateUserApi = async (id, userData) => {
  const URL_API = `/v1/api/profile`;
  return await axios.patch(URL_API, userData);
};

const updatePasswordApi = async (id, passwordData) => {
  const URL_API = `/v1/api/password`;
  return await axios.patch(URL_API, passwordData);
};

const getAccountApi = async () => {
  const URL_API = '/v1/api/account';
  return await axios.get(URL_API);
};

const sendOtpApi = async (data) => {
  const URL_API = '/v1/api/sendotp';
  return await axios.post(URL_API, data);
};

const verifyOtpApi = async (otpData) => {
  const URL_API = '/v1/api/verifyotp';
  return await axios.post(URL_API, otpData);
};

// Chat APIs
const sendChatMessage = async (message, userId = null) => {
  const URL_API = '/v1/api/chat/ask';
  const data = {
    message,
    userId
  };
  return await axios.post(URL_API, data);
};

const getChatStatsApi = async () => {
  const URL_API = '/v1/api/chat/stats';
  return await axios.get(URL_API);
};

export {
  // User APIs
  createUserApi,
  LoginApi,
  getUserApi,
  updateUserApi,
  updatePasswordApi,
  getAccountApi,
  sendOtpApi,
  verifyOtpApi,
  
  // Chat APIs
  sendChatMessage,
  getChatStatsApi
};