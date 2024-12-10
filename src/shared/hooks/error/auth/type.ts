export interface AuthErrorHandlingOption {
  scope?:
    | 'LOGIN'
    | 'REQUEST_SIGN_UP'
    | 'REQUEST_CHANGE_PASSWORD';
  data?: any;
}
