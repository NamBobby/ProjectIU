import { createSelector } from "reselect";
export const reducer = (state) => state.formVerifyAccountEmail;

export const formSubmitLoadingSelector = createSelector(
	reducer,
	(data) => data?.formVerifyAccountEmailLoading || false,
);

export const formSubmitSuccessSelector = createSelector(
	reducer,
	(data) => data?.formVerifyAccountEmailSuccess || false,
);

export const formSubmitErrorSelector = createSelector(
	reducer,
	(data) => data?.formVerifyAccountEmailError || false,
);

export const formSubmitDataResponseSelector = createSelector(
	reducer,
	(data) => data?.formVerifyAccountEmailDataResponse || null,
);
