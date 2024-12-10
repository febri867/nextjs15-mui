import { useSelector } from 'react-redux';

import { RootState } from './store';
import { Loading } from './types';
import { HTTPResponse } from 'src/domains/core/entity';

export default function DataModel() {
  const snackbarState = useSelector((state: RootState) => state.ui.snackbarState);

  const overlayLoading = useSelector((state: RootState) => state.ui.loading[Loading.overlay]);

  const overlayKtpUploadLoading = useSelector(
    (state: RootState) => state.ui.loading[Loading.overlayKtpUpload],
  );

  const loginLoading = useSelector((state: RootState) => state.ui.loading[Loading.login]);

  const errorPopupState = useSelector((state: RootState) => state.ui.errorPopupState);

  const error: HTTPResponse<never> = useSelector((state: RootState) => state.ui.error);

  return {
    snackbarState,
    overlayLoading,
    loginLoading,
    errorPopupState,
    error,
    overlayKtpUploadLoading,
  };
}
