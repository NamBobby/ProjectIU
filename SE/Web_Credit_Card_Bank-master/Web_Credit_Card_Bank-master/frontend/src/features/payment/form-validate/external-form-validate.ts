import * as yup from 'yup';
export const ExternalFormValidate = yup.object().shape({
    CardSendId: yup.number()
    .max(1000000000000, "Wrong Input")
    .min(100000000000, "Wrong Input"),

    CardReceiveId: yup.number()
    .max(1000000000000, "Wrong Input")
    .min(100000000000, "Wrong Input")
    .required('Required'),

    Balance: yup.number()
    .min(100000, 'More than 100,000 VND')
    .required('Required'),

    Description: yup.string()
    .min(10, "Wrong Input")
    .max(150, "Wrong Input")
    .required('Required'),

    OTP: yup.number()
    .min(100000, 'wrong otp')
    .max(999999, "wrong otp")
    .required('Required'),
})