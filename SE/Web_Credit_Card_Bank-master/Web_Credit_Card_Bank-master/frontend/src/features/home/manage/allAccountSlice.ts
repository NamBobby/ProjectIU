import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeApi } from "../../../api";
import { RootState } from "../../../app/store";
import { FullCardInfoDto, fullCardStateDto, listAccountDto, loginHistoryStateDto } from "../home-dto";

export const initialState: listAccountDto= {
    listAccount: [],
    errMsg: '',
    status: 'idle',

}

export const getAllAccount = createAsyncThunk(
    "ListAccount/getListAccount", async(state:any, thunkApi) => {
        let response: any = await homeApi.getAllAccount();
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
    }
)

export const allAccountInfoSlice = createSlice({
    name: 'ListAccount',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllAccount.pending, (state ) => {
            state.status = 'isLoading';
        })
        .addCase(getAllAccount.rejected, (state, action:PayloadAction<any>) => {
            state.errMsg = action.payload;
            state.status = 'failed';
        })
        .addCase(getAllAccount.fulfilled, (state, action:PayloadAction<any>) => {
            state.status = 'idle';
            state.listAccount = action.payload;
        })
    }

})

export const { reducer, actions } = allAccountInfoSlice;
// export const { setUserInfo } = actions;
export const selectListAllAccount = (state: RootState) => state.listAccountState;
export default reducer;