import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "../../../api/login-api";
import { RootState } from "../../../app/store";
import { decodeToken } from "../jwtProcess/decode-jwt";
import { loginInfo, loginState } from "./login-dto";
import { setLoginInfo } from "./loginInfoSlice";

const initialState: loginState = {
    token:'',
    status: 'idle',
    errMsg:'',
    type: ''
}

export const loginFunction = createAsyncThunk(
    'Login/test',
    async (params: loginInfo, thunkApi) => {
        const response:any = await loginApi.postLogin(params);
        if (response.statusCode >300) {
            return thunkApi.rejectWithValue(response.message);
        }
        thunkApi.dispatch(setLoginInfo(params));
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

export const loginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginFunction.pending, (state) => {
            state.status = 'isLoading';
          })
        .addCase(loginFunction.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'idle';
            state.token = action.payload;
            sessionStorage.setItem("token",state.token);
            let decode = decodeToken.jwtDecodeTypeFunc(state.token);
            state.type = decode;
            
        })
        .addCase(loginFunction.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })
    }
})


  


export const { reducer, actions } = loginSlice;
export const { setToken } = actions;
export const selectLoginState = (state: RootState) => state.login;
export default reducer;
