import { takeLatest } from "redux-saga/effects";
import { generateFormSubmitSagas } from "@utility/StoreMethod";
import { actions, types } from "./reducer";
import * as service from "./service";

const name = "formForgotUsernameEmail";
const nameUp = name.toUpperCase();
const sagaListFunction = generateFormSubmitSagas(name, actions, service);
export const submitForm = sagaListFunction[`${name}CallMethod`];

export default function* () {
	yield takeLatest(types[`${nameUp}_METHOD`], submitForm);
}
