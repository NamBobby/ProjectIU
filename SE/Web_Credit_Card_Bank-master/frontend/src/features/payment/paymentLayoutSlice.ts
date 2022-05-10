import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Layout, paymentLayoutState } from "./payment-dto";

export const initialState: paymentLayoutState = {
    Layout: 'none',
}


export const paymentLayoutSlice = createSlice ({
    name:'PaymentLayout',
    initialState,
    reducers: {
        setPaymentLayout: (state, action: PayloadAction<Layout> ) => {
            console.log(action.payload);
            state.Layout = action.payload;
        }
    }
})

export const { reducer, actions } = paymentLayoutSlice;
export const { setPaymentLayout } = actions;
export const selectPaymentLayoutState = (state: RootState) => state.paymentLayoutState;
export default reducer;