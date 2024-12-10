import { AlertColor } from '@mui/material';
import { HTTPResponse } from 'src/domains/core/entity';

export interface ISnackbarState {
  open: boolean;
  type: AlertColor;
  message: string;
}

export interface ErrorPopupState {
  open?: boolean;
  title?: string;
  message?: string;
  action?: {
    id?: string;
    cta?: string;
  }[];
  popUpStyle?: string;
  callback?: () => void;
  errorCode?: string;
}

export enum Loading {
  overlay = 'OVERLAY',
  overlayKtpUpload = 'OVERLAY_KTP_UPLOAD',
  login = 'POST_LOGIN',
}

export interface TriggerLoadingPayload {
  actionType: string;
  loading: boolean;
}

export interface InitialState {
  // Enum Loading
  loading: {
    [key: string]: boolean | undefined;
  };
  snackbarState: ISnackbarState;
  errorPopupState?: ErrorPopupState;
  error?: HTTPResponse<any>;
}
