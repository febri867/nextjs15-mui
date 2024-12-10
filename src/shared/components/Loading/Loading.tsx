import { Backdrop, CircularProgress, Portal } from '@mui/material'
import React, { createContext, useContext, useMemo, useReducer } from 'react'

interface LoadingInterface {
  show: boolean
}

export const Loading = ({ show = false }: LoadingInterface) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

interface LoadingContextInterface {
  state: LoadingInterface
  dispatch: {
    handleOpen: () => void
    handleClose: () => void
  }
}

const LoadingContext = createContext<LoadingContextInterface>(
  {} as LoadingContextInterface,
)

export function LoadingContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prev: LoadingInterface, next: Partial<LoadingInterface>) => ({
      ...prev,
      ...next,
    }),
    {
      show: false,
    },
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpen = () => {
    dispatch({
      ...state,
      show: true,
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
    <LoadingContext.Provider value={value}>
      <Portal>
        <Loading {...state} />
      </Portal>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoadingContext() {
  const { state, dispatch } = useContext(LoadingContext)
  return [state, dispatch] as const
}
