import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cardApi } from "../../api/card-api";
import { RootState } from "../../app/store";
import { cardInfoDto } from "../home/home-dto";


const cardInit = {
    CardID: 0,
    CurrentBalance: 0,
    DateOfExpired: '',
    CardStatus: {
        StatusID: 0,
        StatusName:'',
    },
    CardType:{
        CardTypeId: 0,
        LineOfDebit:0,
        TypeName: '',
    },
}

export interface cardLayout {
    //show infor card before lock or screen choose card
    screen: 'show' | 'choose' |'home'
    status:'idle' | 'isLoading' | 'failed'
    errMsg: string,
    card: cardInfoDto

}

export const initialState: cardLayout = {
    screen:'home',
    status: 'idle',
    errMsg: '',
    card:cardInit
}

export const lockCard = createAsyncThunk(
    'LockCard/lock', async(cardId: number,  thunkApi) => {
        let info = {
            CardID: cardId,
            StatusName: 'lock'
        }
        console.log(info);
        let response: any = await cardApi.lockCard(info);
        console.log(response);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            return response
        }
    })


export const lockCardSlice = createSlice ({
    name:'LockCard',
    initialState,
    reducers: {
        setCardToLock: (state, action: PayloadAction<any>) => {
            state.card = action.payload;
        },

        setScreen:(state, action:PayloadAction<any>) => {
            state.screen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(lockCard.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(lockCard.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })
        .addCase(lockCard.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'idle';
        })
    }
})

export const { reducer, actions } = lockCardSlice;
export const { setCardToLock, setScreen } = actions;
export const selectLockCardState = (state: RootState) => state.lockCardState;
export default reducer;