export interface loginState {
    token: string,
    status: 'idle' | "isLoading" | "failed",
    errMsg: string,
    type: string
}

export interface decodeJwtDto {
    sub: string,
    userName: string,
    type: string,
    iat: number,
    exp: number
}

export interface loginInfo {
    UserName: string,
    Password: string
}

export type loginScreenDto = {
    errMsg?: string,
}