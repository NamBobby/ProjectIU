import { createSelector } from "reselect"
export const reducer = (state) => state.formActivePayAccountSuperSchoolMemory

export const formSubmitLoadingSelector = createSelector(
  reducer,
  (data) => data?.formActivePayAccountSuperSchoolMemoryLoading || false
)

export const formSubmitSuccessSelector = createSelector(
  reducer,
  (data) => data?.formActivePayAccountSuperSchoolMemorySuccess || false
)

export const formSubmitErrorSelector = createSelector(
  reducer,
  (data) => data?.formActivePayAccountSuperSchoolMemoryError || false
)

export const formSubmitDataResponseSelector = createSelector(
  reducer,
  (data) => data?.formActivePayAccountSuperSchoolMemoryDataResponse || null
)
export const getActiveCodeSelector = createSelector(
  reducer,
  (data) => data?.activeCode || ""
)

export const getSuccessNotiSelector = createSelector(
  reducer,
  (data) => data?.successNoti || ""
)

export const getUserInfoSelector = createSelector(
  reducer,
  (data) => data?.userInfo || null
)
