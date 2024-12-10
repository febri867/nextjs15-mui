import { Box } from '@mui/material'
// import Head from 'next/head'
import InquiryFormList from './components/dashboard/InquiryFormList'
import Header from './components/dashboard/Header'

export default function InquiryFormPage() {
  return (
      <Box display="flex" flexDirection="column" gap={4}>
        {/*<Header />*/}
        <InquiryFormList />
      </Box>
  )
}
