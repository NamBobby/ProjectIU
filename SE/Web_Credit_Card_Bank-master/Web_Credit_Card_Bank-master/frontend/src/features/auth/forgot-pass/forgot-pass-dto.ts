export interface forgotPassDto {
    PhoneNumber: string | number,
    ID: string | number,
    Email: string,
}
export interface changePassDto extends forgotPassDto {
    PhoneNumber: number,
    ID:number,
    NewPassword: string,
    Status: 'Change Password' | 'forgot password',
}

export type changePassState = {
    state: string,
    status: 'idle' | 'isLoading' | 'failed',  
    errMsg: string
}

export interface changePass extends forgotPassDto {
    RecentPass:string,
    OldPassword: string,
    Password: string,
    NewPassword: string
}