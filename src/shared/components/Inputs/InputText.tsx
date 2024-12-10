import {
  FormControl,
  FormControlProps,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  InputLabelProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form'

export type InputIconProps = {
  position: 'start' | 'end'
  name: string
}

export type InputTextProps = {
  size?: string
  id?: string
  name?: string
  fullWidth?: boolean
  icon?: InputIconProps
  register?: UseFormRegisterReturn
  errorMessage?: string
  /**
   * Used for adornment with handler (button)
   * @returns void
   */
  iconHandler?: () => void
} & TextFieldProps &
  Omit<InputLabelProps, 'onKeyDown' | 'onKeyPress'> &
  Omit<FormControlProps, 'onKeyDown' | 'onKeyPress'>

const InputText = ({
  size,
  name,
  id,
  placeholder,
  fullWidth,
  label,
  defaultValue,
  icon,
  register,
  errorMessage,
  iconHandler,
  ...rest
}: InputTextProps) => {
  const renderAdornment = (() => {
    if (typeof icon !== 'undefined') {
      if (typeof iconHandler !== 'undefined') {
        return (
          <InputAdornment position={icon.position}>
            <IconButton edge={icon.position} onClick={iconHandler}>
              <Icon>{icon?.name}a</Icon>
            </IconButton>
          </InputAdornment>
        )
      } else {
        return (
          <InputAdornment position={icon.position}>
            <Icon>{icon?.name}</Icon>
          </InputAdornment>
        )
      }
    }
  })()
  return (
    <FormControl variant="standard" size={size} fullWidth={fullWidth}>
      {label && (
        <InputLabel sx={{fontSize:'20px'}} shrink htmlFor={id} size={size}>
          {label}
        </InputLabel>
      )}
      <TextField
        defaultValue={defaultValue}
        id={id}
        name={name}
        placeholder={placeholder}
        fullWidth={fullWidth}
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{
          '& .MuiInputBase-root': {
            marginTop: label ? '24px' : '0px',
          },
          '& .Mui-disabled':{
            backgroundColor: "#eee"
          }
        }}
        InputProps={{
          inputProps: { min: 0 },
          startAdornment:
            !!(typeof icon !== 'undefined' && icon.position === 'start') &&
            renderAdornment,
          endAdornment:
            !!(typeof icon !== 'undefined' && icon.position === 'end') &&
            renderAdornment,
        }}
        {...register}
        {...rest}
      />
    </FormControl>
  )
}

export default InputText
