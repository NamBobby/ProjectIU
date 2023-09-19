import { createSelector } from "reselect";
export const reducer = (state) => state.formForgotPasswordEmail;

export const formSubmitLoadingSelector = createSelector(
	reducer,
	(data) => data?.formForgotPasswordEmailLoading || false,
);

export const formSubmitSuccessSelector = createSelector(
	reducer,
	(data) => data?.formForgotPasswordEmailSuccess || false,
);

export const formSubmitErrorSelector = createSelector(
	reducer,
	(data) => data?.formForgotPasswordEmailError || false,
);

export const formSubmitDataResponseSelector = createSelector(
	reducer,
	(data) => data?.formForgotPasswordEmailDataResponse || null,
);
