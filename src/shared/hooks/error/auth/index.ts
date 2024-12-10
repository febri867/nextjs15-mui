import React from 'react';

import { HTTPResponse } from '@/src/domains/core/entity';
import Helper from '@/src/core/redux/helper';
import { deleteLoginData, deleteToken } from '@/src/shared/utils/local-storage';

import dictionary from './dictionary';
import { AuthErrorHandlingOption } from './type';

const useAuthErrorHandler = () => {
  const { setErrorPopupState, setError } = Helper();
  const errorHandling = React.useCallback(
    (error: HTTPResponse<any> | undefined, options?: AuthErrorHandlingOption) => {
      try {
        if (!error) {
          setErrorPopupState(dictionary.GENERAL_ERROR);
          return;
        }
        setError(error as HTTPResponse<any>);
        // LOGOUT WHEN TOKEN EXPIRED
        if (error?.error_code === 40006 || error?.error_code === '40006') {
          deleteToken();
          deleteLoginData();
          window.location.replace('/');
          return;
        }
        // example: LOGIN_40002
        const errorCode = options?.scope
          ? `${options?.scope}_${error?.error_code}`
          : error?.error_code;
        if (errorCode && dictionary[errorCode as string]) {
          setErrorPopupState(dictionary[errorCode as string]);
          return;
        }
        setErrorPopupState(dictionary.GENERAL_ERROR);
      } catch (error) {
        setErrorPopupState(dictionary.GENERAL_ERROR);
      }
    },
    [],
  );
  return errorHandling;
};

export default useAuthErrorHandler;
