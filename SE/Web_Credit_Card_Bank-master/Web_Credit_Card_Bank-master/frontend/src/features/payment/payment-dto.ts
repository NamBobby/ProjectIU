export const bankName: string[] = [
'VietinBank', 'VPBank', 'BIDV', 'MB', 'Vietcombank', 'Techcombank','ACB', 'Sacombank', 'SHB', 'HDBank', 'SCB', 'Eximbank', 'SeABank', 'MSB', 'VIB', 'OCB', 'TPBank', 'PVcombank', 'Bac A Bank', 'AB BANK', 'Nam A Bank', 'Saigonbank'
]

export const location: string [] = [
    "An Giang", "Vung Tau", "Tp. HCM", "Bac Lieu", "Soc Trang", "Ha Noi", "Binh Duong", "Can Tho", "Dong Nai", "Gia Lai", "Ha Nam", "Ha Noi", "Hoa Binh", "Lang Son", "Nam Dinh", "Nghe An", "Ha Tinh","Tay Ninh", "Tra Vinh", "Long An", "Vinh Long", "Thua Thien Hue"
] 
export interface internalPaymentDto {
    CardSendId: string,
    CardReceiveId: string,
    Balance: string,
    Description: string,
    OTP: string,
}

export const internalPaymentInit: internalPaymentDto = {
    CardSendId:'',
    CardReceiveId:'',
    Balance:'',
    Description:'',
    OTP:'',

}

export const externalPaymentInit: externalPaymentDto = {
    CardSendId:'',
    CardReceiveId:'',
    Bank: '',
    Balance:'',
    Description:'',
    OTP:'',

}
export interface externalPaymentDto extends internalPaymentDto {
    Bank: string,
}

export type paymentStateDto = {
    paymentInfo: externalPaymentDto,
    state: string,
    status:'idle' | 'isLoading' | 'failed' | 'success',
    errMsg:'',
}

export interface internalTransferInfoDto extends externalTransferInfoDto {
    CardIdReceive: number,
}

export interface externalTransferInfoDto {
    CardIdSend: number,
    Balance: number,
    Location: string,
}

export type Layout = 'internal' | 'external' | 'none' | 'success';

export type paymentLayoutState = {
    Layout: Layout
} 

export type SuccessTransferForm = {
    CardIdSend: number,
    CardIdReceive: number,
    Bank?: string,

}