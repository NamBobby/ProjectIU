
import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Login } from './auth';
import { decodeToken } from './auth/jwtProcess/decode-jwt';
import { loginState } from './auth/login/login-dto';
import { selectLoginState, setToken } from './auth/login/loginSlice';
import { AdminHome } from './home/admin/admin-home';
import { UserHome } from './home/user/user-home';
import { LoadingScreen } from './waiting/loading-screen';

export const RenderAuthen: React.FC<loginState> = ({token, status, errMsg, type}) => {
    console.log('token:', token);
    console.log(type);
    if(status === 'isLoading') {
        return (
            <LoadingScreen/>
        )
    } else if (status === 'idle' && token === '') {
        return (
            <Login/>
        )
    } else if (status === 'idle' && token !== '') {
        if(type === 'User') {
            return (
                <UserHome/>
            )
        } else 
            return(
                <AdminHome/>
            )
    } else 
        return (
            <Login />
        )

}
export const Layout: React.FC = () => {
    let authenStatus: loginState = useAppSelector(selectLoginState);
    let localToken = sessionStorage.getItem("token");
    let type: string = '';
    let token: string = '';
    let dispatch = useAppDispatch();
    if(localToken !== null) {
        dispatch(setToken(localToken));
        if(decodeToken.checkExpToken(localToken) === false) {
            token = localToken;
            type = decodeToken.jwtDecodeTypeFunc(token);
        } else {
            sessionStorage.removeItem("token");
        }
    }
    return (
        <div>
            <RenderAuthen token = {token} status = {authenStatus.status} errMsg = {authenStatus.errMsg} type = {type} />
        </div>
    )
}
