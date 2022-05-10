import { IsDate, IsEAN, IsEmail, IsInt, isInt, IsNumber, IsString, isString, length, Length, MaxLength, MinLength } from "class-validator";


export class AccountRegisterDto {
    @IsString()
    @MaxLength(20)
    FirstName: string;

    @IsString()
    @MaxLength(20)
    LastName: string;

    @IsEmail()
    Email:string;

    @IsString()
    @MaxLength(20)
    UserName:string;

    @IsString()
    @MaxLength(20)
    Password:string;

    @IsNumber()
    PhoneNumber: number;

    @IsNumber()
    IdentifyCard:number;

    @IsString()
    DateOfBirth: string;

    @IsString()
    @MaxLength(50)
    Address: string;
}

export class AccountLoginDto {
        @IsString()
        @MaxLength(20)
        UserName:string;
    
        @IsString()
        @MaxLength(20)
        Password: string;
    
}

export type AccountInfoResponse = {
    FirstName: string,
    LastName: string, 
    Email:string,
    PhoneNumber: number,
    IdentifyCard:number,
    DateOfBirth: string,
    Address: string,
}

export type fineOneDto = {
    status: string,
    id?: number,
    account?: AccountLoginDto
}
export type findUserDto = {
    IdentifyCard: number
}

export type AccountTypeDto = {
    AccountId?: number,
    FirstName: string,
    LastName: string,
    Email:string,
    UserName:string,
    Password:string,
    PhoneNumber: number;
    IdentifyCard?:number,
    DateOfBirth?: Date,
    Address?: string,
    Card?: []
    LoginHistory?: []

}

export type updatePassword = {
    UserName: string,
    ID: number,
    Password: string,
}