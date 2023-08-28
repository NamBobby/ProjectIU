import { createSelector } from 'reselect';
export const reducer = (state) => state.Home;

export const getDataHome = createSelector(
  reducer,
  (data) => data?.homeData || {}
);

export const getLoadingDataHomeSelector = createSelector(
  reducer,
  (data) => data?.loading || false
);

export const getHomeError = createSelector(reducer, (data) => data?.error);
