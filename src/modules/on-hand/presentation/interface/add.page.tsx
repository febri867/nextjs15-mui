import { Box } from '@mui/material'

import AddForm from '@/src/modules/on-hand/presentation/interface/components/inquiry-form/Add'

export default function RequestOnHandPage({role}: any) {
  return (

      <Box display="flex" flexDirection="column" gap={4}>
        <AddForm role={role} />
      </Box>
  )
}
