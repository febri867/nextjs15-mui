import {
  Alert,
  AlertProps,
  Portal,
  Slide,
  Snackbar,
  SnackbarProps,
} from '@mui/material'
import React, { createContext, useContext, useMemo, useReducer } from 'react'

type ToastSeverity = 'success' | 'warning' | 'info' | 'error'
interface ToastInterface {
  show: boolean
  message?: string
  duration?: number
  handleClose: () => void
  severity: ToastSeverity
  customSnackbarProps?: SnackbarProps
  customAlertProps?: AlertProps
}

export const Toast = ({
  show,
  duration,
  message,
  handleClose,
  severity = 'info',
  customSnackbarProps,
  customAlertProps,
}: ToastInterface) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
      autoHideDuration={duration || 2500}
      TransitionComponent={Slide}
      open={show}
      {...customSnackbarProps}
    >
      <Alert
        variant="filled"
        severity={severity}
        onClose={handleClose}
        {...customAlertProps}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

type OpenToast = {
  message: string
  severity: ToastSeverity
  duration?: number
}

type ToastProviderState = Omit<
  ToastInterface,
  'customAlertProps' | 'customSnackbarProps' | 'handleClose'
>
interface ToastContextInterface {
  state: ToastProviderState
  dispatch: {
    handleOpen: (_: OpenToast) => void
    handleClose: () => void
  }
}

const ToastContext = createContext<ToastContextInterface>(
  {} as ToastContextInterface,
)

export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prev: ToastProviderState, next: Partial<ToastProviderState>) => ({
      ...prev,
      ...next,
    }),
    {
      show: false,
      message: undefined,
      duration: undefined,
      severity: 'info',
    },
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpen = ({ message, severity, duration }: OpenToast) => {
    dispatch({
      ...state,
      show: true,
      duration,
      message,
      severity,
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = () => {
    dispatch({
      ...state,
      show: false,
    })
  }

  const actions = useMemo(
    () => ({ handleOpen, handleClose }),
    [handleOpen, handleClose],
  )
  const value = {
    state,
    dispatch: actions,
  }

  return (
    <ToastContext.Provider value={value}>
      <Portal>
        <Toast handleClose={handleClose} {...state} />
      </Portal>
      {children}
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const { state, dispatch } = useContext(ToastContext)
  return [state, dispatch] as const
}
