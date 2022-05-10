import { loginInfo } from "../features/auth/login/login-dto";
import * as dotenv from 'dotenv'
import axiosClient from "./axios-client";
import { changePassDto } from "../features/auth/forgot-pass/forgot-pass-dto";

dotenv.config()

export const { REACT_APP_LOGIN_URL } = process.env;

export const loginApi = {
    postLogin: (params: loginInfo) => {
        const url = `${REACT_APP_LOGIN_URL}`;
        return axiosClient.post(url, params)
    },

    changePassword: (params: changePassDto) => {
        const url = 'changepassword';
        return axiosClient.post(url, params);
    }
}