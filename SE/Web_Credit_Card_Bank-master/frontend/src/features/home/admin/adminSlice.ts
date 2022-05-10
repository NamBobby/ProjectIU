import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { adminInfoStateDto } from "../home-dto";

export const initialState: adminInfoStateDto = {
    layout:'Home',
    status: 'idle',
    errMsg: '',
}

export const adminHomeSlice = createSlice ({
    name:'UserHome',
    initialState,
    reducers: {
        setAdminHomeLayout: (state, action: PayloadAction<any>) => {
            state.layout = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(getAccountInfo.pending, (state) => {
    //         state.status = 'isLoading';
    //     })
    //     .addCase(getAccountInfo.rejected, (state, action: PayloadAction<any>) => {
    //         state.status = 'failed';
    //         state.errMsg = action.payload;
    //     })
    //     .addCase(getAccountInfo.fulfilled, (state, action: PayloadAction<any>) => {
    //         state.status ='idle';
    //     })
    // }
})


export const { reducer, actions } = adminHomeSlice;
export const { setAdminHomeLayout } = actions;
export const selectAdminHomeState = (state: RootState) => state.adminHomeState;
export default reducer;