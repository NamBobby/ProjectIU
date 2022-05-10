import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { paymentApi } from '../../api';
import { RootState } from '../../app/store';
import { externalPaymentDto, externalTransferInfoDto, internalPaymentDto, internalPaymentInit, internalTransferInfoDto, location, paymentStateDto, externalPaymentInit } from './payment-dto';
import { setPaymentLayout } from './paymentLayoutSlice';


export const initialState:paymentStateDto = {
    paymentInfo: externalPaymentInit,
    state:'',
    status:'idle',
    errMsg:''
}

export const internalTransfer = createAsyncThunk(
    'Payment/InternalTransfer', async(params: internalPaymentDto, thunkApi) => {
        console.log(params);
        let randomLocation = Math.round(Math.random() * (location.length - 1));
        let internalRequest: internalTransferInfoDto = {
            CardIdSend: parseInt(params.CardSendId),
            Balance: parseInt(params.Balance),
            CardIdReceive: parseInt(params.CardReceiveId),
            Location: location[randomLocation],
        } 
        let response:any = await paymentApi.internalTransfer(internalRequest);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            thunkApi.dispatch(setInternalPaymentInfo(params));
            thunkApi.dispatch(setPaymentLayout('success'));
            return response
        }
        return response;
    })

export const externalTransfer = createAsyncThunk(
    'Payment/ExternalTransfer', async(params: externalPaymentDto, thunkApi) => {
        let randomLocation = Math.round(Math.random() * (location.length - 1));
        let externalRequest: externalTransferInfoDto = {
            CardIdSend: parseInt(params.CardSendId),
            Balance: parseInt(params.Balance),
            Location: location[randomLocation],
        }
        let response:any = await paymentApi.externalTransfer(externalRequest);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            thunkApi.dispatch(setExternalPaymentInfo(params));
            thunkApi.dispatch(setPaymentLayout('success'));
            return response
        }
    }
)

export const paymentSlice = createSlice ({
    name:'Payment',
    initialState,
    reducers: {
        setErrMsg: (state, actions: PayloadAction<any>) => {
            state.errMsg = actions.payload;
            state.status = 'failed';
        },

        setDefaultStatus: (state) => {
            state.errMsg = '';
            state.status = 'idle';
        },

        setInternalPaymentInfo:(state, action: PayloadAction<internalPaymentDto>) => {
            let temp: any = action.payload;
            temp["Bank"] = '';
            state.paymentInfo = temp;
            console.log(state.paymentInfo);
        },

        setExternalPaymentInfo: (state, action: PayloadAction<externalPaymentDto>) => {
            state.paymentInfo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(internalTransfer.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(internalTransfer.rejected, (state, actions: PayloadAction<any>) => {
            state.status = 'failed';
            console.log(state.errMsg);
            state.errMsg = actions.payload;
        }) 
        .addCase(internalTransfer.fulfilled, (state, actions: PayloadAction<any>) => {
            state.status = 'idle';
            state.state = actions.payload
        })
        .addCase(externalTransfer.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(externalTransfer.rejected, (state, actions: PayloadAction<any>) => {
            state.status = 'failed';
            console.log(state.errMsg);
            state.errMsg = actions.payload;
        }) 
        .addCase(externalTransfer.fulfilled, (state, actions: PayloadAction<any>) => {
            state.status = 'idle';
            state.state = actions.payload
        })
    }
})

export const { reducer, actions } = paymentSlice;
export const { setErrMsg, setInternalPaymentInfo, setExternalPaymentInfo, setDefaultStatus } = actions;
export const selectPaymentState = (state: RootState) => state.paymentState;
export default reducer;