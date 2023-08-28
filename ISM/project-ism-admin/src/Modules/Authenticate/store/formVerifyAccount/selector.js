import { createSelector } from 'reselect'
export const reducer = (state) => state.formVerifyAccount

export const formSubmitLoadingSelector = createSelector(
    reducer,
    (data) => data?.formVerifyAccountLoading || false
)

export const formSubmitSuccessSelector = createSelector(
    reducer,
    (data) => data?.formVerifyAccountSuccess || false
)

export const formSubmitErrorSelector = createSelector(
    reducer,
    (data) => data?.formVerifyAccountError || false
)

export const formSubmitDataResponseSelector = createSelector(
    reducer,
    (data) => data?.formVerifyAccountDataResponse || null
)
