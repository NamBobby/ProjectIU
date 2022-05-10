import { cardCreatedStateDto, createCardInfoDto } from "./register-dto";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../../app/store";
import { registerApi } from "../../../api";


export const initialState: cardCreatedStateDto = {
    isCreated:'',
    status:'idle',
    errMsg:'',
}

export const createCard = createAsyncThunk(
    'CreateCard/create', async(params:createCardInfoDto, thunkApi) => {
        console.log(params);
        let response:any = await registerApi.createCard(params);
        //because status Code fail always greater than 2xx
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            window.alert("The new card infomation was send to your mail");
            return response
        }
    }
)

export const createCardSlice = createSlice ({
    name:'CreateCard',
    initialState,
    reducers: {
        setDefaultCreateCardErrMsg: (state) => {
            state.errMsg = '';
            state.isCreated ='';
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCard.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(createCard.rejected, (state, actions: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = actions.payload;
        })
        .addCase(createCard.fulfilled, (state, actions: PayloadAction<any>) => {
            state.status = 'idle';
            state.isCreated = actions.payload;
            state.errMsg ='';
        })
    }
})

export const { reducer, actions } = createCardSlice;
export const { setDefaultCreateCardErrMsg } = actions;
export const selectCardCreatedState = (state: RootState) => state.cardCreated;
export default reducer;