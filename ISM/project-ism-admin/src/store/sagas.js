import commonSaga from "./common/sagas";
import userSagas from "./user/sagas";

export default [commonSaga(), userSagas()];
