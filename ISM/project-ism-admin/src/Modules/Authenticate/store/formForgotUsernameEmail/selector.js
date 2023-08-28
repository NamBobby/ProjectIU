import { createSelector } from "reselect";
export const reducer = (state) => state.formForgotUsernameEmail;

export const formSubmitLoadingSelector = createSelector(
	reducer,
	(data) => data?.formForgotUsernameEmailLoading || false,
);

export const formSubmitSuccessSelector = createSelector(
	reducer,
	(data) => data?.formForgotUsernameEmailSuccess || false,
);

export const formSubmitErrorSelector = createSelector(
	reducer,
	(data) => data?.formForgotUsernameEmailError || false,
);

export const formSubmitDataResponseSelector = createSelector(
	reducer,
	(data) => data?.formForgotUsernameEmailDataResponse || null,
);
