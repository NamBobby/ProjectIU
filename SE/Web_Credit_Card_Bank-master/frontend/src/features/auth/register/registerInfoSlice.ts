import { registerInfoFormDto } from "./register-dto";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../../app/store";
import { registerApi } from "../../../api";


export const initialState:registerInfoFormDto = {
    status:'idle',
    cardType:[],
    errMsg:''
}

export const cardTypeInfo = createAsyncThunk(
    'Register/fetchCardType', async() => {
        let response:any = await registerApi.fetchCardType();
        
        return response;
    })

export const registerSlice = createSlice ({
    name:'Register',
    initialState,
    reducers: {
        setDefaultRegisterErrMsg: (state) => {
            state.errMsg = "";
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(cardTypeInfo.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(cardTypeInfo.rejected, (state, actions: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = actions.payload;
        }) 
        .addCase(cardTypeInfo.fulfilled, (state, actions: PayloadAction<any>) => {
            state.status = 'idle';
            state.cardType = actions.payload;
        })
    }
})

export const { reducer, actions } = registerSlice;
export const { setDefaultRegisterErrMsg } = actions;
export const selectRegisterState = (state: RootState) => state.register;
export default reducer;