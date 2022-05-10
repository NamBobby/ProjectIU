import * as dotenv from 'dotenv';
import { externalTransferInfoDto, internalTransferInfoDto } from "../features/payment/payment-dto";
import axiosClient from "./axios-client";

dotenv.config()

export const { REACT_APP_PAYMENT, REACT_APP_PAYMENT_INTERNAL, REACT_APP_PAYMENT_EXTERNAL } = process.env;

export const paymentApi = {
    internalTransfer: (params: internalTransferInfoDto) => {
        console.log(params);
        const url = `${REACT_APP_PAYMENT}/${REACT_APP_PAYMENT_INTERNAL}`;
        return axiosClient.post(url, params)
    },
    externalTransfer: (params: externalTransferInfoDto) => {
        const url = `${REACT_APP_PAYMENT}/${REACT_APP_PAYMENT_EXTERNAL}`;
        return axiosClient.post(url, params)
    }
}