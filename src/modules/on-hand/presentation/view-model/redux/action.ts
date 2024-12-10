import { useDispatch } from 'react-redux';
import { usecase } from '@/src/modules/inquiry-form/util';
import Helper from '@/src/core/redux/helper';
import { Loading } from '@/src/core/redux/types';
import { HTTPResponse } from '@/src/domains/core/entity';
import useAuthErrorHandler from '@/src/shared/hooks/error/auth';
import { baseBoxActions } from './slice';
import {InquiryFormListResponse} from "@/src/domains/inquiry-form/entity.ts";

const InquiryFormActionModel = () => {
  const dispatch = useDispatch();
  const errorHandling = useAuthErrorHandler();
  const { setSnackbarState, triggerLoading, setError } = Helper();

  function requestInquiryFormList() {
    return async () => {
      try {
        triggerLoading({ actionType: Loading.overlay, loading: true });
        const response: HTTPResponse<InquiryFormListResponse> = await usecase.requestInquiryFormList();
        if (response?.data) {
          dispatch(baseBoxActions.setInquiryFormList(response.data.devices))
          return response.data
        }
      } catch (error) {
        errorHandling(error as HTTPResponse<any> | undefined, { scope: 'LOGIN' });
      } finally {
        triggerLoading({ actionType: Loading.overlay, loading: false });
      }
    };
  }

  return {
    requestInquiryFormList: () =>
      dispatch(requestInquiryFormList()),

    setSnackbarState,
    triggerLoading,
    setError,
  };
};

export default InquiryFormActionModel;
