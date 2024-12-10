import { useSelector } from 'react-redux';

import DataModel from '@/src/core/redux/data';
import { RootState } from '@/src/core/redux/store';
import { IInquiryFormEntity} from "@/src/domains/inquiry-form/entity.ts";

export default function AuthDataModel() {
  const dataModel = DataModel();

  // const baseBoxList: IInquiryFormEntity[] = useSelector((state: RootState) => state.dashb.baseBoxList);
  return {
    // baseBoxList,
    ...dataModel,
  };
}
