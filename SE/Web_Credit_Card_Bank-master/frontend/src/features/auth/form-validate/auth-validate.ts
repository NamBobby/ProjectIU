import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    UserName: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    Password: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
})

export const registerSchema = yup.object().shape({
    UserName: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    Password: yup.string()
    .min(10, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    FirstName:yup.string()
    .min(2, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    Email:yup.string().email('Not a Email'),
    LastName:yup.string()
    .min(2, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    PhoneNumber:yup.number()
    .max(1000000000, 'Wrong Input')
    .min(100000000,'Wrong Input')
    .required('Required'),
    IdentifyCard:yup.number()
    .max(1000000000000, "Wrong Input")
    .min(100000000000, "Wrong Input")
    .required('Required'),
    DateOfBirth:yup.string(),
    Address: yup.string()
    .max(50, 'Wrong Input')
    .min(7, 'Wrong Input')
    .required('Required'),
})

export const forgotSchema = yup.object().shape({
    PhoneNumber:yup.number()
    .max(1000000000, 'Wrong Input')
    .min(100000000,'Wrong Input')
    .required('Required'),

    Email:yup.string().email('Not a Email').required("Required"),

    ID:yup.number()
    .max(1000000000000, "Wrong Input")
    .min(100000000000, "Wrong Input")
    .required("Required"),
})

export const changePassSchema = yup.object().shape({
    OldPassword: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    Password: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
    NewPassword: yup.string()
    .min(7, 'Wrong Input')
    .max(20, 'Wrong Input')
    .required('Required'),
})