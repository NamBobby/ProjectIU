import { createSelector } from "reselect"
export const user = (state) => state.user

export const getUserData = createSelector(user, (data) => data?.userData)

// export const getGeneralMenu = createSelector(
//     user,
//   data => data?.generalInfoMenu || null,
// );

export const getGeneralMenuLoading = createSelector(
  user,
  (data) => data?.loading || null
)
