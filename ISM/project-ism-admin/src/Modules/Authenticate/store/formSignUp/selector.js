import { createSelector } from 'reselect'
export const reducer = (state) => state.formSignUp

export const formSubmitLoadingSelector = createSelector(
    reducer,
    (data) => data?.formSignUpLoading || false
)

export const formSubmitSuccessSelector = createSelector(
    reducer,
    (data) => data?.formSignUpSuccess || false
)

export const formSubmitErrorSelector = createSelector(
    reducer,
    (data) => data?.formSignUpError || false
)

export const formSubmitDataResponseSelector = createSelector(
    reducer,
    (data) => data?.formSignUpDataResponse || data?.formSignUpDataResponse?.error || null
)
