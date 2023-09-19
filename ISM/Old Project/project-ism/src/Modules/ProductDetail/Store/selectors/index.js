import { createSelector } from "reselect";
export const reducer = (state) => state.Cart;

export const getDataCart = createSelector(
  reducer,
  (data) => data?.dataCart || {}
);

export const getLoadingCart = createSelector(reducer, (data) => data?.loading);

export const getErrorCart = createSelector(reducer, (data) => data?.error);
export const getSuccessCart = createSelector(reducer, (data) => data?.success);
