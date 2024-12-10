import { Box } from '@mui/material'

import AddForm from '@/src/modules/inquiry-form/presentation/interface/components/inquiry-form/Add'

export default function AddBaseboxPage() {
  return (

      <Box display="flex" flexDirection="column" gap={4}>
        <AddForm />
      </Box>
  )
}
