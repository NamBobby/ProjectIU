import { handleActions } from "redux-actions";
import { generateFormSubmitRedux } from "@utility/StoreMethod";
const name = "formVerifyAccountEmail";
const reduxFormGenerate = generateFormSubmitRedux(name);

export const types = {
	...reduxFormGenerate.types,
};

export const actions = {
	...reduxFormGenerate.actions,
};

const defaultState = {
	...reduxFormGenerate.defaultState,
};

export default handleActions(
	{
		...reduxFormGenerate.handleActions,
	},
	defaultState,
);
