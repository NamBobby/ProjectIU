import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeApi } from "../../../api";
import { RootState } from "../../../app/store";
import { listPaymentHistoryStateDto } from "../home-dto";

export const initialState: listPaymentHistoryStateDto = {
    listPaymentHis: [],
    status:'idle',
    errMsg:''
}

export const getAllPaymentHis = createAsyncThunk(
    "PaymentHistory/getAllPaymentHis", async(state:any, thunkApi) => {
        let response: any = await homeApi.getAllPayment();
        console.log(response);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
    }
)

export const paymentHistorySlice = createSlice({
    name: 'PaymentHistory',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllPaymentHis.pending, (state ) => {
            state.status = 'isLoading';
        })
        .addCase(getAllPaymentHis.rejected, (state, action:PayloadAction<any>) => {
            state.errMsg = action.payload;
            state.status = 'failed';
        })
        .addCase(getAllPaymentHis.fulfilled, (state, action:PayloadAction<any>) => {
            state.status = 'idle';
            state.listPaymentHis = action.payload;
        })
    }

})

export const { reducer, actions } = paymentHistorySlice;
// export const { setUserInfo } = actions;
export const selectPaymentHistory = (state: RootState) => state.paymentHistoryState;
export default reducer;