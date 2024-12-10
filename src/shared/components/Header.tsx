import { Box, Typography } from '@mui/material'

export interface CommonHeaderPropsInterface {
  children?: React.ReactNode
  title: string
}

export default function CommonHeader({
  title,
  children,
}: CommonHeaderPropsInterface) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>

      {children}
    </Box>
  )
}
