import { createSelector } from "reselect";

export const accountList = (state) => state.accountListReducer;

export const accountListSelector = createSelector(accountList, (data) => {
	return data?.list || [];
});
