import React from 'react'
import Confirmation from '@/src/shared/components/Confirmation'
import { InputText } from '@/src/shared/components/Inputs'
import Panel from '@/src/shared/components/Panel'
import { Box, Divider, Typography } from '@mui/material'
import { KeyboardEvent, memo, useState } from 'react'
import Table from './InquiryFormTable.tsx'
import useInquiryFormDashboard from "@/src/modules/inquiry-form/presentation/interface/hooks/useInquiryFormDashboard.ts";
function DashboardBaseboxList() {

  const {
      baseBoxList,
    fetchInquiryFormList,
  } = useInquiryFormDashboard()

  const [showConfirmation, setShowConfirmation] = useState<{
    id?: string
    show: boolean
  }>({ id: undefined, show: false })


  React.useEffect(() => {
      fetchInquiryFormList()
  }, [])

  return (
    <Panel noPadding containerProps={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={3}
        sx={{
          '& input': {
            marginTop: '0px',
          },
        }}
      >
        <InputText
          placeholder="Search by InquiryForm name"
          type="text"
          icon={{
            position: 'end',
            name: 'search',
          }}
          sx={{
            maxWidth: '450px',
            '& .MuiInputBase-root': {
              marginTop: '0px',
            },
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault()
            }
          }}
          fullWidth
        />
      </Box>
      <Divider />
      <Box
        padding={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="500">List of InquiryForm</Typography>
      </Box>
      <Divider />
      <Table
        baseBoxList={baseBoxList}
        isLoading={false}
        onDelete={(id: string) => setShowConfirmation({ id, show: true })}
        onShowDetail={() =>
            {}
        }
      />
      <Confirmation
        open={showConfirmation.show}
        handleClose={() => setShowConfirmation({ id: undefined, show: false })}
        handleConfirm={() => {
          setShowConfirmation({ id: undefined, show: false })
        }}
        title="Delete InquiryForm"
        message="Are you sure you want to delete this InquiryForm?"
        variant="error"
        isLoading={false}
      />
    </Panel>
  )
}

export default memo(DashboardBaseboxList)
