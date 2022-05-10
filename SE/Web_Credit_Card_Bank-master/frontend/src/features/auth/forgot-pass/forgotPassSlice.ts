import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginApi } from '../../../api';
import { RootState } from '../../../app/store';
import { changePass, changePassDto, changePassState, forgotPassDto } from './forgot-pass-dto';

export const initialState: changePassState = {
    state:'',
    status: 'idle',
    errMsg:''
}

export const forgotPass = createAsyncThunk(
    'ChangePass/forgotPass', async(params: forgotPassDto, thunkApi) => {
        let forgotInfoRequest: changePassDto = {
            PhoneNumber: Number(params.PhoneNumber),
            ID: Number(params.ID),
            Email: params.Email,
            NewPassword: '',
            Status: 'forgot password'
        }
        let response: any = await loginApi.changePassword(forgotInfoRequest);
        if (response.statusCode >300) {
            return thunkApi.rejectWithValue(response.message);
        }
        return response;
    }
)

export const changePassword = createAsyncThunk(
    'ChangePass/changePass', async(params: changePass, thunkApi) => {
        if(params.OldPassword !== params.RecentPass) {
            console.log('we are there');
            return thunkApi.rejectWithValue("wrong password recent");
        } else {
            if(params.Password === params.NewPassword) {
                let forgotInfoRequest: changePassDto = {
                    PhoneNumber: Number(params.PhoneNumber),
                    ID: Number(params.ID),
                    Email: params.Email,
                    NewPassword: params.Password,
                    Status: 'Change Password'
                }
                let response: any = await loginApi.changePassword(forgotInfoRequest);
                if (response.statusCode >300) {
                    return thunkApi.rejectWithValue(response.message);
                }
                return response;
            } else {
                return thunkApi.rejectWithValue("wrong password");
            }
        }
    }
)


export const changePassSlice = createSlice({
    name: 'ChangePass',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(forgotPass.pending, (state) => {
            state.status = 'isLoading';
          })
        .addCase(forgotPass.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'idle';
            state.state = action.payload;
        })
        .addCase(forgotPass.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })
        .addCase(changePassword.pending, (state) => {
            state.status ='isLoading';
        })
        .addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = 'idle';
            state.state = action.payload;
        })
        .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.errMsg = action.payload;
        })

    }

})


export const { reducer, actions } = changePassSlice;
// export const { setloginInfo } = actions;
export const selectChangePassState = (state: RootState) => state.changePasswordState;
export default reducer;
