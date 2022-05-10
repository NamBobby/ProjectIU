

export type sendMailState = {
    code: number,
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: ''
}
