import { createSelector } from 'reselect'
export const reducer = (state) => state.formSignUpDev

export const formSubmitLoadingSelector = createSelector(
    reducer,
    (data) => data?.formSignUpDevLoading || false
)

export const formSubmitSuccessSelector = createSelector(
    reducer,
    (data) => data?.formSignUpDevSuccess || false
)

export const formSubmitErrorSelector = createSelector(
    reducer,
    (data) => data?.formSignUpDevError || false
)

export const formSubmitDataResponseSelector = createSelector(
    reducer,
    (data) => data?.formSignUpDevDataResponse || data?.formSignUpDevDataResponse?.error || null
)
