import { createSelector } from 'reselect'
export const reducer = (state) => state.formForgotUsername

export const formSubmitLoadingSelector = createSelector(
    reducer,
    (data) => data?.formForgotUsernameLoading || false
)

export const formSubmitSuccessSelector = createSelector(
    reducer,
    (data) => data?.formForgotUsernameSuccess || false
)

export const formSubmitErrorSelector = createSelector(
    reducer,
    (data) => data?.formForgotUsernameError || false
)

export const formSubmitDataResponseSelector = createSelector(
    reducer,
    (data) => data?.formForgotUsernameDataResponse || null
)
