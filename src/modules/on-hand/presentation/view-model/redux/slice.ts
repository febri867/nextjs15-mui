import { createSlice } from '@reduxjs/toolkit';

import { InquiryFormInitialState } from './types';

const baseBoxInitialState: InquiryFormInitialState = {
  baseBoxList: []
};

const baseBoxSlice: any = createSlice({
  name: 'baseBox',
  initialState: baseBoxInitialState,
  reducers: {
    setInquiryFormList (state, { payload }) {
      state.baseBoxList = payload;
    },
  },
});

export const baseBoxActions = baseBoxSlice.actions;

export default baseBoxSlice;
