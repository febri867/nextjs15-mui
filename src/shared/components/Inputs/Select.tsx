import {
  Box,
  CircularProgress,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  InputLabelProps,
  MenuItem,
  Select as MuiSelect,
  OutlinedInput,
  SelectProps,
} from '@mui/material'
import type { UseFormRegisterReturn } from 'react-hook-form'

type OptionType = string | { value: string; label: string }

export interface SelectInterface{
  fullWidth?: boolean
  containerProps?: FormControlProps
  selectProps?: SelectProps
  labelProps?: InputLabelProps
  label?: string
  placeholder?: string
  options: OptionType[]
  errorMessage?: string
  register?: UseFormRegisterReturn
  isLoading?: boolean
  multiple?: boolean,
  value?: string | number | string[],
  onChange?: any,
  disabled?: boolean
}

export default function Select({
  fullWidth,
  containerProps,
  selectProps,
  labelProps,
  label,
  placeholder,
  options,
  errorMessage,
  register,
  isLoading = false,
  multiple = false,
                                 value,
                                 onChange = ()=>{},
                                 disabled=false
}: SelectInterface) {
  const isOptionString = typeof options[0] === 'string'
  const optionListMenu = isOptionString
    ? (options as string[]).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))
    : (options as { value: string; label: string }[]).map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))

  return (
    <FormControl variant="standard" fullWidth={fullWidth} {...containerProps}>
      {label && (
        <InputLabel sx={{fontSize:'20px'}} shrink {...labelProps}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
          disabled={disabled}
          sx={{
            '&.Mui-disabled': {
              backgroundColor:'#eee'
            }
          }}
        input={<OutlinedInput />}
        defaultValue={multiple ? [] : 'none'}
        displayEmpty={isLoading || multiple}
        error={!!errorMessage}
        value={value}
        onChange={onChange}
        {...((isLoading || multiple) && {
          renderValue: (selected) => {
            if (multiple) {
              const value = selected as string[]
              if (value.length === 0) {
                return (
                  <Box display="flex" alignItems="center" gap="8px">
                    <span>{placeholder}</span>
                    {isLoading && <CircularProgress size={12} />}
                  </Box>
                )
              }

              return value.join(',')
            }

            return (
              <Box display="flex" alignItems="center" gap="8px">
                <span>{placeholder}</span>
                <CircularProgress size={12} />
              </Box>
            )
          },
        })}
        multiple={multiple}
        {...register}
        {...selectProps}
      >
        {placeholder && (
          <MenuItem value="none" disabled>
            {placeholder}
          </MenuItem>
        )}
        {optionListMenu}
      </MuiSelect>
      {errorMessage && (
        <FormHelperText sx={{ color: (theme) => theme.palette.error.main }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  )
}
