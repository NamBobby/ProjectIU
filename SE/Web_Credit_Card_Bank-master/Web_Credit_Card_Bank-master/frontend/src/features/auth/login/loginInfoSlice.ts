import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { loginInfo } from "./login-dto";

export const initialState: loginInfo = {
    UserName: '',
    Password: ''
}

export const loginInfoSlice = createSlice({ 
    name: 'LoginInfo',
    initialState,
    reducers: {
        setLoginInfo: (state, actions:PayloadAction<loginInfo>) => {
            state.UserName = actions.payload.UserName;
            state.Password = actions.payload.Password;
        }
    },
})

export const { reducer, actions } = loginInfoSlice;
export const { setLoginInfo } = actions;
export const selectLoginInfoState = (state: RootState) => state.loginInfo;
export default reducer;