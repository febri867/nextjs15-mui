import { LinearProgress } from '@mui/material'

interface ProgressInterface {
  value: number
}

export default function Progress({ value }: ProgressInterface) {
  return (
    <LinearProgress
      sx={{
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: 'disabled.main',
      }}
      color="primary"
      variant="determinate"
      value={value}
    />
  )
}
