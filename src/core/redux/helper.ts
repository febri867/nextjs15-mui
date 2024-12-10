import { useDispatch } from 'react-redux';

import { AppDispatch } from './store';
import { uiActions } from './slice';
import { ErrorPopupState, TriggerLoadingPayload } from './types';
import { HTTPResponse } from 'src/domains/core/entity';

export default function Helper() {
  const dispatch: AppDispatch = useDispatch();

  function triggerLoading(payload: TriggerLoadingPayload) {
    return dispatch(uiActions.triggerLoading(payload));
  }

  function setSnackbarState(payload: object) {
    return dispatch(uiActions.setSnackbarState(payload));
  }

  function setErrorPopupState(payload: ErrorPopupState) {
    return dispatch(uiActions.setErrorPopupState(payload));
  }

  function setError(payload: HTTPResponse<any>) {
    return dispatch(uiActions.setError(payload));
  }

  return {
    triggerLoading,
    setSnackbarState,
    setErrorPopupState,
    setError,
  };
}
