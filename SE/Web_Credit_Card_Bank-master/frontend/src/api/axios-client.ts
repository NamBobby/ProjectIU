import axios from 'axios';
import { decodeToken } from '../features/auth/jwtProcess/decode-jwt';
require('dotenv').config()

const {REACT_APP_SERVER_URL} = process.env;

const axiosClient = axios.create({
    baseURL: REACT_APP_SERVER_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params =>  {
        let test = Object.values(params).join('/');
        console.log(test);
        
        return test;
    },
    data: (data:any) => JSON.stringify(data),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token:any = sessionStorage.getItem("token");
    if(token !== null){
        if(decodeToken.checkExpToken(token) === false) {
            config.headers = {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
            }
        }
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response; 
}, (error) => {
    // Handle errorsÍ
    console.log("axiosClienterr(): ", error.response.data);
    // return reject(error);
    return error.response.data;
});

export default axiosClient;