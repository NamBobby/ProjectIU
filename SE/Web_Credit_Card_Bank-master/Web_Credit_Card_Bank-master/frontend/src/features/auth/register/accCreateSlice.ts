import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerApi } from '../../../api';
import { RootState } from '../../../app/store';
import { createCard } from './cardCreateSlice';
import { processDob } from './components';
import { createCardInfoDto, registerFormDto, registerStateDto } from './register-dto';

export const initialState: registerStateDto = {
    token: '',
    status: 'idle',
    errMsg: ''
}

export const createAccountFunc = createAsyncThunk(
    'CreateAccount/create', async(params: registerFormDto, thunkApi) => {
        let dateOfBirth:string = processDob(params.day,params.month, params.year);
        let {day, month, year, ...registerInfo} = params;
        registerInfo.DateOfBirth = dateOfBirth;
        if(registerInfo.type ==='') {
            registerInfo.type = 'Normal';
        }
        console.log('accCreate():', registerInfo);
        let response:any = await registerApi.registAccount(registerInfo)
        if(response.statusCode > 300 ) {
            return thunkApi.rejectWithValue(response.message);
        } else {
            let cardInfo: createCardInfoDto = {
                IdentifyCard: Number(params.IdentifyCard),
                type: registerInfo.type
            }
            thunkApi.dispatch(createCard(cardInfo));
            return response
        }
    }
)


export const accountCreateSlice = createSlice({
    name: 'CreateAccount',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(createAccountFunc.pending, (state) => {
            state.status = 'isLoading';
        })
        .addCase(createAccountFunc.rejected, (state, actions: PayloadAction<any>) => {
            state.status ='failed';
            state.errMsg = actions.payload;
        })
        .addCase(createAccountFunc.fulfilled, (state, actions: PayloadAction<any>)=> {
            state.token =actions.payload;
            state.status = 'idle';
            state.errMsg ='';
        })
    }

})

export const { reducer, actions } = accountCreateSlice;
// export const {  } = actions;
export const selectAccountCreatedState = (state: RootState) => state.accountCreated;
export default reducer;