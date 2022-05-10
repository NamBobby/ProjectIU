import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeApi } from "../../../api";
import { RootState } from "../../../app/store";
import { loginHistoryStateDto } from "../home-dto";

export const initialState: loginHistoryStateDto = {
    listLoginHis: [],
    errMsg: '',
    status: 'idle',

}

export const getAllLoginHis = createAsyncThunk(
    "LoginHistory/getAllLoginHis", async(state:any, thunkApi) => {
        let response: any = await homeApi.getAllLoginHis();
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
    }
)

export const loginHistorySlice = createSlice({
    name: 'LoginHistory',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllLoginHis.pending, (state ) => {
            state.status = 'isLoading';
        })
        .addCase(getAllLoginHis.rejected, (state, action:PayloadAction<any>) => {
            state.errMsg = action.payload;
            state.status = 'failed';
        })
        .addCase(getAllLoginHis.fulfilled, (state, action:PayloadAction<any>) => {
            state.status = 'idle';
            state.listLoginHis = action.payload;
        })
    }

})

export const { reducer, actions } = loginHistorySlice;
// export const { setUserInfo } = actions;
export const selectLoginHistory = (state: RootState) => state.loginHistoryState;
export default reducer;