import { createTheme } from '@mui/material'
import { Open_Sans as OpenSans } from 'next/font/google'

export const openSans = OpenSans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
})

let theme = createTheme({
  palette: {
    primary: {
      main: '#2d6764',
      secondary: '#FFF4F4',
    },
    secondary: {
      main: '#2EE5B5',
    },
    error: {
      main: '#EC0C0C',
    },
    success: {
      main: '#3FC380',
    },
    disabled: {
      main: '#F2F2F2',
      secondary: '#8DB8F3',
    },
    text: {
      primary: '#333333',
      secondary: '#BDBDBD',
      inverse: '#FFFFFF',
      error: '#EC0C0C',
      success: '#3FC380',
      disabled: '#7F8A9A',
    },
    border: {
      main: '#e0e0e0',
      secondary: '#F2F2F2',
      focus: '#2B4AC7',
      error: '#EC0C0C',
    },
    icon: {
      main: '#152C4A',
      disabled: '#7F8A9A',
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
})

theme = createTheme(theme, {
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&': {
            marginTop: theme.spacing(3),
            borderRadius: 8,
            borderColor: theme.palette.border?.main,
          },
          '& .MuiInputBase-input': {
            borderRadius: 8,
            position: 'relative',
            padding: '14px',
            transition: theme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
          },
          '& input:invalid + fieldset': {
            borderColor: theme.palette.error.main,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'initial',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px',
        },
      },
    },
  },
})

export default theme
