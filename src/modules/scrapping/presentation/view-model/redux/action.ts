import { useDispatch } from 'react-redux';
import { usecase } from '@/src/modules/inquiry-form/util';
import Helper from '@/src/core/redux/helper';
import { Loading } from '@/src/core/redux/types';
import { HTTPResponse } from '@/src/domains/core/entity';
import useAuthErrorHandler from '@/src/shared/hooks/error/auth';
import { baseBoxActions } from './slice';
import {InquiryFormListResponse} from "@/src/domains/scrapping/entity.ts";

const InquiryFormActionModel = () => {
  const dispatch = useDispatch();
  const errorHandling = useAuthErrorHandler();
  const { setSnackbarState, triggerLoading, setError } = Helper();

  function requestScrappingList() {
    return async () => {
      try {
        triggerLoading({ actionType: Loading.overlay, loading: true });
        const response: HTTPResponse<any> = await usecase.requestScrappingList();
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
    requestScrappingList: () =>
      dispatch(requestScrappingList()),

    setSnackbarState,
    triggerLoading,
    setError,
  };
};

export default InquiryFormActionModel;
