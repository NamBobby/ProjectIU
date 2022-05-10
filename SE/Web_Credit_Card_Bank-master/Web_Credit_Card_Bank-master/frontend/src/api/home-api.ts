import * as dotenv from 'dotenv';
import axiosClient from "./axios-client";

dotenv.config()

export const { REACT_APP_CARD, REACT_APP_ACCOUNT, REACT_APP_LOGIN_HIS } = process.env;

export const homeApi = {
    getAccountById: (id: number) => {
        let url = `${REACT_APP_ACCOUNT}/${id}`;
        return axiosClient.get(url);
    },

    getCardById: (id: number) => {
        let url = `${REACT_APP_CARD}/${id}`;
        return axiosClient.get(url);
    },

    getAllLoginHis: () => {
        let url = `${REACT_APP_LOGIN_HIS}`;
        return axiosClient.get(url);
    },

    getAllPayment: () => {
        let url = `payment`;
        return axiosClient.get(url);
    },

    getAllCard: () => {
        let url = `${REACT_APP_CARD}`;
        return axiosClient.get(url);
    },
    getAllAccount: () => {
        let url = `${REACT_APP_ACCOUNT}`;
        return axiosClient.get(url);
    }
}