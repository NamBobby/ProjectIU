import { handleActions, createAction } from "redux-actions";
import { generateFormSubmitRedux } from "@utility/StoreMethod";
const name = "formVerifyAccount";
const nameUp = name.toUpperCase();
const reduxFormGenerate = generateFormSubmitRedux(name);

export const types = {
	...reduxFormGenerate.types,
	[`${nameUp}_UPDATE`]: `${nameUp}_UPDATE`,
};

export const actions = {
	...reduxFormGenerate.actions,
	[`${name}FnUpdate`]: createAction(`${nameUp}_UPDATE`),
};

const defaultState = {
	...reduxFormGenerate.defaultState,
};

export default handleActions(
	{
		...reduxFormGenerate.handleActions,
		[`${nameUp}_UPDATE`]: (state, { payload }) => {
			return {
				[`${name}Loading`]: false,
				[`${name}Success`]: false,
				[`${name}Error`]: false,
				[`${name}DataResponse`]: Array.isArray(payload)
					? [...payload]
					: typeof payload === "object"
					? { ...payload }
					: payload,
			};
		},
	},
	defaultState,
);
