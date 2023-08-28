import { createSelector } from 'reselect';

export const common = (state) => state.common;

export const getCodeLanguage = createSelector(common, (data) => {
  return data.codeLanguage || 'vi-VN';
});

export const getLanguage = createSelector(common, (data) => {
  return data.language || 'vi';
});

export const getShareInfoSelector = createSelector(common, (data) => {
  return data.shareInfo || {};
});
