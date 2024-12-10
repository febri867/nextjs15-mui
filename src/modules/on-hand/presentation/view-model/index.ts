import { injectReducer } from '@/src/core/redux/store';
import slice from './redux/slice';
import dataModel from './redux/data';
import actionModel from './redux/action';

export default function InquiryFormViewModel() {
  injectReducer('inquiryForm', slice.reducer);
  return {
    dataModel: () => dataModel(),
    actionModel: () => actionModel(),
  };
}
