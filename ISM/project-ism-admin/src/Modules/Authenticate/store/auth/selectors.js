import { createSelector } from "reselect"

export const auth = (state) => state.auth

export const accessTokenSelector = createSelector(
  auth,
  (data) => data?.accessToken || null
)

export const userDataSelector = createSelector(
  auth,
  (data) => data?.userData || {}
)

export const loadingSelector = createSelector(auth, (data) => {
  return data?.loading || false
})

export const loginSuccessSelector = createSelector(auth, (data) => {
  return data?.loginSuccess || false
})

export const errorSelector = createSelector(auth, (data) => {
  return data?.error || ""
})
