import { loginInfo } from "../features/auth/login/login-dto"
import { createCardInfoDto, registerFormRequestDto } from "../features/auth/register/register-dto";
import axiosClient from "./axios-client";
import * as dotenv from 'dotenv';
dotenv.config()

export const registerApi = {
    checkAccountExisted: (UserName:string, Password: string) => {
        let accountInfo:loginInfo = {
            UserName: UserName,
            Password: Password
        }
        let url = '';
        return axiosClient.post(url, accountInfo);
    },
    registAccount: (params: registerFormRequestDto) => {
        let url = `${process.env.REACT_APP_REGISTER_URL}`;
        return axiosClient.post(url, params);
    },
    createCard: (params: createCardInfoDto) => {
        let url = `${process.env.REACT_APP_CARD}`;
        return axiosClient.post(url, params);
    },
    fetchCardType: () => {
        let url ='card/cardtype';
        return axiosClient.get(url);
    }
}