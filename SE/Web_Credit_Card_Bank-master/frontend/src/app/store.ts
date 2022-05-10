import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/auth/login/loginSlice';
import accountExistedReducer from '../features/auth/register/accountExistedSlice';
import accountCreatedReducer from '../features/auth/register/accCreateSlice';
import cardCreatedReducer from '../features/auth/register/cardCreateSlice';
import registerReducer from '../features/auth/register/registerInfoSlice';
import loginInfoReducer from '../features/auth/login/loginInfoSlice';
import paymentReducer from '../features/payment/paymentSlice';
import userHomeReducer from '../features/home/user/userSlice';
import sendMailReducer from '../features/sendmail/sendMailSlice';
import cardInfoReducer from '../features/home/user/cardInfoSlice';
import paymentLayoutReducer from '../features/payment/paymentLayoutSlice';
import loginHistoryReducer from '../features/home/manage/loginHistorySlice';
import listCardReducer from '../features/home/manage/allCardSlice';
import listPaymentReducer from '../features/home/manage/paymentHistorySlice';
import changePassReducer from '../features/auth/forgot-pass/forgotPassSlice';
import lockCardReducer from '../features/card/lockCardSlice';
import adminHomeReducer from '../features/home/admin/adminSlice';
import listAccountReducer from '../features/home/manage/allAccountSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    accountExisted: accountExistedReducer,
    accountCreated: accountCreatedReducer,
    cardCreated: cardCreatedReducer,
    register:registerReducer,
    loginInfo: loginInfoReducer,
    paymentState: paymentReducer,
    userHomeState: userHomeReducer,
    sendMail: sendMailReducer,
    cardInfo: cardInfoReducer,
    paymentLayoutState: paymentLayoutReducer,
    loginHistoryState: loginHistoryReducer,
    listCardState: listCardReducer,
    paymentHistoryState: listPaymentReducer,
    changePasswordState: changePassReducer,
    lockCardState: lockCardReducer,
    adminHomeState: adminHomeReducer,
    listAccountState: listAccountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
