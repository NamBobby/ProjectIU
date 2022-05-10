import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeApi } from "../../../api";
import { RootState } from "../../../app/store";
import { FullCardInfoDto, fullCardStateDto, loginHistoryStateDto } from "../home-dto";

export const initialState: fullCardStateDto= {
    listCard: [],
    errMsg: '',
    status: 'idle',

}

export const getAllCard = createAsyncThunk(
    "ListCard/getListCard", async(state:any, thunkApi) => {
        let response: any = await homeApi.getAllCard();
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
    }
)

export const allCardInfoSlice = createSlice({
    name: 'ListCard',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllCard.pending, (state ) => {
            state.status = 'isLoading';
        })
        .addCase(getAllCard.rejected, (state, action:PayloadAction<any>) => {
            state.errMsg = action.payload;
            state.status = 'failed';
        })
        .addCase(getAllCard.fulfilled, (state, action:PayloadAction<any>) => {
            state.status = 'idle';
            state.listCard = action.payload;
        })
    }

})

export const { reducer, actions } = allCardInfoSlice;
// export const { setUserInfo } = actions;
export const selectListAllCard = (state: RootState) => state.listCardState;
export default reducer;