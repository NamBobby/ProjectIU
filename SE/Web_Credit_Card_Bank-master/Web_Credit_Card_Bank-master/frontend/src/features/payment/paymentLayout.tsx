import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { ExternalPayment, InternalPayment, TransferSuccessFrom } from './components';
import { externalPaymentDto, paymentLayoutState } from './payment-dto';
import { selectPaymentLayoutState } from './paymentLayoutSlice';
import { selectPaymentState } from './paymentSlice';

export const RenderPaymentLayout: React.FC<paymentLayoutState> = ({Layout}) => {
    const paymentInfo: externalPaymentDto = useAppSelector(selectPaymentState).paymentInfo;


    switch(Layout) {
        case 'internal': 
            return (
                <InternalPayment/>
            )
        case 'external': 
            return  (
                <ExternalPayment />
            )
        case 'success': {
            return (
                <TransferSuccessFrom 
                    CardSendId={paymentInfo.CardSendId}
                    CardReceiveId={paymentInfo.CardReceiveId}
                    Balance={paymentInfo.Balance}
                    Description={paymentInfo.Description}
                    Bank ={paymentInfo.Bank}
                    OTP = {paymentInfo.OTP}
                    />
            )
        }
        default: 
            return (
                <Navigate to='/' replace={true}/>
            )
    }
}

export const PaymentLayout: React.FC = () => {
    const PaymentLayoutState = useAppSelector(selectPaymentLayoutState);
    return (
        <div>
            <RenderPaymentLayout Layout ={PaymentLayoutState.Layout}/>
        </div>
    )
}