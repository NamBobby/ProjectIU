
export type userInfoDto = {
    AccountId: number,
    FirstName: string,
    LastName: string,
    Email: string,
    UserName: string,
    PhoneNumber: number,
    IdentifyCard: number,
    DateOfBirth: string,
    Address: string,
};

export const userInfoInitial:userInfoDto = {
    AccountId: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    UserName: '',
    PhoneNumber: 0,
    IdentifyCard: 0,
    DateOfBirth: '',
    Address: '',
};

export type userInfoStateDto = {
    layout: 'payment' | 'lockCard' | 'changePass' | 'Home' | 'addCard',
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,
    accountInfo: userInfoDto
};
export type adminInfoStateDto = {
    layout: 'loginHis' | 'payment' | 'card' | 'Home' | 'account' | 'createNewAccount',
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,
};

export type cardTypeDto = {
    CardTypeId: number,
    TypeName: string,
    LineOfDebit: number
};

export type cardStatusDto = {
    StatusID: number,
    StatusName: string
};


export interface cardInfoDto {
    CardID: number,
    CurrentBalance: number,
    DateOfExpired: string,
    CardType: cardTypeDto,
    CardStatus: cardStatusDto,
};

export type listCardInfoDto = cardInfoDto[];

export type cardInfoStateDto = {
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,
    cardInfo: listCardInfoDto
    card: cardInfoDto
};

//full card have account
export interface FullCardInfoDto extends cardInfoDto {
    Account: userInfoDto,
};

export type listCard = FullCardInfoDto[];

export type accountInfoDto = {
    AccountId: number,
    FirstName: string,
    LastName: string,
    Email: string,
    UserName: string,
    PhoneNumber: number,
    IdentifyCard?: number,
    DateOfBirth?: string,
    Address?: string,
};

export type listAccountDto = {
    listAccount: accountInfoDto[],
    errMsg:string,
    status: 'idle' | 'isLoading' | 'failed',
}

export type loginHisStatusDto = {
    StatusID: number,
    StatusName: string,
}

export type loginHisDto = {
    LoginId: number,
    Date: string,
    Time: string,
    UserName: string,
    Password: string,
    Account: userInfoDto,
    LoginHisStatus: loginHisStatusDto,
}

export type listLoginHistory = loginHisDto[];

export type paymentTypeDto = {
    PaymentTypeID: number,
    PaymentFee: number,
    TypeName: string,
}

export type paymentStatusDto = {
    PaymentStatusID: number,
    StatusName: string
}

export type paymentHisInfoDto= {
    PaymentID: number,
    Amounts: number,
    CurrentBalance: number,
    Location: string,
    Time: string,
    Date: string,
    Card: cardInfoDto,
    PaymentType: paymentTypeDto,
    PaymentStatus:paymentStatusDto
}

export type loginHistoryStateDto = {
    listLoginHis: listLoginHistory,
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,
}

export type listPaymentHistoryStateDto = {
    listPaymentHis: paymentHisInfoDto[],
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,
}

export type fullCardStateDto = {
    listCard: FullCardInfoDto[],
    status: 'idle' | 'isLoading' | 'failed',
    errMsg: string,

}