import * as dotenv from 'dotenv';
import axiosClient from "./axios-client";

dotenv.config()

export const { REACT_APP_CARD, REACT_APP_ACCOUNT, REACT_APP_LOGIN_HIS } = process.env;

export interface cardLockInfo {
    CardID: number,
    StatusName: string,
}

export const cardApi = {
    lockCard: (params: cardLockInfo) => {
        let url = `${REACT_APP_CARD}/lock`;
        return axiosClient.post(url, params);
    }
}