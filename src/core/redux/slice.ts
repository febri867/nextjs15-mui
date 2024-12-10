import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  loading: {},
  snackbarState: { open: false, type: 'success', message: '' },
  errorPopupState: {},
  error: {},
};

// [NOTE]: bugs https://github.com/microsoft/TypeScript/issues/42873
// temporary fix: adding pnpm override immer and install immer in package.json
// also specify path to immer in tsconfig.json
const uiSlice: any = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    triggerLoading(state, { payload: { actionType, loading } }) {
      state.loading[actionType] = loading;
    },
    setSnackbarState(state, { payload }) {
      state.snackbarState = payload;
    },
    setErrorPopupState(state, { payload }) {
      state.errorPopupState = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
