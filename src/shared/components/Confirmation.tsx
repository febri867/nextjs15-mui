import {
  Button,
  ButtonTypeMap,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

export interface ConfirmationInterface {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void
  title: string
  message: string
  okText?: string
  cancelText?: string
  variant?: ButtonTypeMap['props']['color']
  isLoading?: boolean
}

export default function Confirmation({
  open,
  handleClose,
  handleConfirm,
  title,
  message,
  okText,
  cancelText,
  isLoading = false,
  variant = 'primary',
}: ConfirmationInterface) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          color={(theme) => theme.palette.text.primary}
          id="alert-dialog-description"
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={variant} variant="outlined" onClick={handleClose}>
          {cancelText || 'Cancel'}
        </Button>
        <Button
          color={variant}
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          {isLoading ? (
            <>
              <span>Confirm</span> &nbsp;
              <CircularProgress sx={{ color: '#fff' }} size="16px" />
            </>
          ) : (
            okText || 'Confirm'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
