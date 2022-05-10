import React from 'react'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMailState } from './send-mail-dto';
import { RootState } from '../../app/store';
import { sendMailApi } from '../../api';

export const initialState: sendMailState = {
    code: 0,
    status: 'idle',
    errMsg: ''
}

export const sendMailFunc = createAsyncThunk(
    'SendMail/getOTP', async(params: number, thunkApi) => {
        let response: any = sendMailApi.getOTP(params);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
        return response;
    }
)

export const sendMailSlice = createSlice({
    name: 'SendMail',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMailFunc.fulfilled, (state, action: PayloadAction<number>) => {
            state.code = action.payload;
            state.status = 'idle';
        })
        .addCase(sendMailFunc.pending, (state) => {
            state.status = 'isLoading'
        })
        .addCase(sendMailFunc.rejected, (state, action:PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })
    }
})

export const { reducer, actions } = sendMailSlice;
// export const {  } = actions;
export const selectSendMailState = (state: RootState) => state.sendMail;
export default reducer;