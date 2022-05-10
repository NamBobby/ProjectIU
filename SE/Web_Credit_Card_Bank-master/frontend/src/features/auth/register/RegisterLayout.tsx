
import React from 'react';
import { Navigate } from 'react-router';
import { Register } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setAdminHomeLayout } from '../../home/admin/adminSlice';
import { LoadingScreen } from '../../waiting/loading-screen';
import { selectAccountCreatedState } from './accCreateSlice';
import { selectAccountExistedState } from './accountExistedSlice';
import { selectCardCreatedState } from './cardCreateSlice';
import { accountRegisterStateDto, cardCreatedStateDto, registerLayout, registerStateDto } from './register-dto';

export const RenderRegisterLayout: React.FC<registerLayout> = ({accountExisted, accountCreated, cardCreated}) => {
    let dispatch = useAppDispatch();
    if(accountCreated.status === 'isLoading' || accountExisted.status === 'isLoading' || cardCreated.status === 'isLoading') {
        return (
            <LoadingScreen/>
        )
    } else if (accountCreated.errMsg !== '' || accountExisted.errMsg !== ''|| cardCreated.errMsg !== '') {
        let errMsg = accountCreated.errMsg + accountExisted.errMsg + cardCreated.errMsg;
        console.log("err: ",errMsg);
        return (
            <Register errMsg = {errMsg}/>
        )
    } else if(accountCreated.token !== '' && accountExisted.isExisted !== '' && cardCreated.isCreated !== '') {
        window.location.reload();
        return (
            <></>
            )   
    } else 
        return (
            <Register errMsg = ''/>
        )

}

export const RegisterLayout: React.FC = () => {
    const createAccountState: registerStateDto = useAppSelector(selectAccountCreatedState);
    const accountExistedState: accountRegisterStateDto = useAppSelector(selectAccountExistedState);
    const cardCreatedState: cardCreatedStateDto = useAppSelector(selectCardCreatedState);

    return (
        <div>
        <RenderRegisterLayout
            accountExisted = {accountExistedState}
            accountCreated = {createAccountState}
            cardCreated = {cardCreatedState}
        />

        </div>
    )
}