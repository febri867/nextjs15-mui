import { Box, BoxProps, Paper, PaperProps } from '@mui/material'

interface PanelPropsInterface extends PaperProps {
  children: React.ReactNode
  noPadding?: boolean
  containerProps?: BoxProps
}

export default function Panel({
  children,
  containerProps,
  noPadding = false,
  ...rest
}: PanelPropsInterface) {
  return (
    <Paper sx={{ padding: !noPadding ? 3 : 0, ...rest.sx }} elevation={0} {...rest}>
      <Box display="flex" {...containerProps}>
        {children}
      </Box>
    </Paper>
  )
}
