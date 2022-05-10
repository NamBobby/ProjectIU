import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { homeApi } from "../../../api";
import { RootState } from "../../../app/store";
import { cardInfoStateDto } from "../home-dto";

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

export const initialState: cardInfoStateDto = {
    status: 'idle',
    errMsg: '',
    cardInfo: [cardInit],
    card:cardInit
}

export const getCardInfo = createAsyncThunk(
    'CardInfo/getCardInfo', async(id: number, thunkApi) => {
        let response: any = await homeApi.getCardById(id);
        if(response.statusCode >300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            
            return response
        }
    }
)

export const cardInfoSlice = createSlice ({
    name:'CardInfo',
    initialState,
    reducers: {
        setOneCard: (state, action: PayloadAction<any>) => {
            console.log(action);
            for(let i = 0; i< state.cardInfo.length; i++) {
                if (action.payload === state.cardInfo[i].CardID) {
                    state.card = state.cardInfo[i];
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCardInfo.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(getCardInfo.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })
        .addCase(getCardInfo.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'idle';
            state.cardInfo = action.payload;
            //because set default is first card
            state.card = state.cardInfo[0];
        })
    }
})


export const { reducer, actions } = cardInfoSlice;
export const { setOneCard } = actions;
export const selectCardState = (state: RootState) => state.cardInfo;
export default reducer;