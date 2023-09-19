import { createSelector } from 'reselect'
export const reducer = (state) => state.formForgotPassword

export const formSubmitLoadingSelector = createSelector(
    reducer,
    (data) => data?.formForgotPasswordLoading || false
)

export const formSubmitSuccessSelector = createSelector(
    reducer,
    (data) => data?.formForgotPasswordSuccess || false
)

export const formSubmitErrorSelector = createSelector(
    reducer,
    (data) => data?.formForgotPasswordError || false
)

export const formSubmitDataResponseSelector = createSelector(
    reducer,
    (data) => data?.formForgotPasswordDataResponse || null
)
