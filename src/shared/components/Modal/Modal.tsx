import React, { createContext, useContext, useMemo, useReducer } from 'react'
import StatelessModal from '@mui/material/Modal'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import { Portal } from '@mui/material'

const ModalStyle = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
`
interface ModalInterface {
  show: boolean
  component: any
  handleClose: () => void
}

export const Modal = ({ show, component, handleClose }: ModalInterface) => {
  const onClose = () => {
    handleClose()
  }

  return (
    <StatelessModal onClose={onClose} open={show}>
      <ModalStyle>{component}</ModalStyle>
    </StatelessModal>
  )
}

type OpenModal = {
  show?: boolean
  component?: any
}

type ModalProviderState = Omit<ModalInterface, 'handleClose'>
interface ModalContextInterface {
  state: ModalProviderState
  dispatch: {
    handleOpen: (_: OpenModal) => void
    handleClose: () => void
  }
}

const ModalContext = createContext<ModalContextInterface>(
  {} as ModalContextInterface,
)

export function ModalContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (prev: ModalProviderState, next: Partial<ModalProviderState>) => ({
      ...prev,
      ...next,
    }),
    {
      show: false,
      component: '',
    },
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpen = ({ component }: OpenModal) => {
    dispatch({
      ...state,
      show: true,
      component,
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
    <ModalContext.Provider value={value}>
      <Portal>
        <Modal handleClose={handleClose} {...state} />
      </Portal>
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  const { state, dispatch } = useContext(ModalContext)
  return [state, dispatch] as const
}
