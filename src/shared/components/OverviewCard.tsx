import { Box } from '@mui/material'

interface OverviewCardPropsInterface {
  children: string | React.ReactNode
}

export default function OverviewCard({ children }: OverviewCardPropsInterface) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #f2f2f2',
        borderRadius: '4px',
      }}
      padding={3}
    >
      {children}
    </Box>
  )
}
