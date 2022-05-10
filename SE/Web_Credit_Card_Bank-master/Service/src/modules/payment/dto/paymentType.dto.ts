
import { IsNumber, IsString } from 'class-validator';
export enum paymentType {
    Free = 'Free',
    Internal= 'Internal',   
    External = 'External'
}

export enum paymentFee {
    Free = 0,
    Internal = 3000,
    External = 7000
}

export class internalPaymentDto {
    @IsNumber()
    CardIdSend: number
    @IsNumber()
    Balance: number
    @IsNumber()
    CardIdReceive: number
    @IsString()
    Location
}

export class externalPaymentDto {
    @IsNumber()
    CardIdSend: number
    @IsNumber()
    Balance: number
    @IsString()
    Location

}

export type cardUpdateDto = {
    CardId: number,
    CurrentBalance: number,
    Balance: number,
    type:string
}

export type paymentHis = {
    Amount: number,
    Location: string,
    Time: Date,
    Date: Date,
}