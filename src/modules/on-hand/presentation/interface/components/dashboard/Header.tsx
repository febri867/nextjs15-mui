import Header from '@/src/shared/components/Header'
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Menu, MenuItem } from '@mui/material'
// import { useRouter } from 'next/router'
import { useState } from 'react'
import useInquiryFormDashboard from '../../hooks/useInquiryFormDashboard.ts'
import { useRouter } from 'next/router'

export default function DashboardHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuWidth, setMenuWidth] = useState<number>(0)
  const open = Boolean(anchorEl)
    const router = useRouter()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    router.push('/on-hand/add')
  }

  const handleClose = () => setAnchorEl(null)
  const handleMenuClick = () => {
    handleClose()
  }

  // const { hasWriteAccess } = useBaseboxDashboard()

  const options = [
    { label: 'New Request ', url: '/on-hand/add' },
    // { label: 'Add Bulk Basebox', url: '/user/import' },
  ]

  // const router = useRouter()

  return (
    <Header title="On-Hand Adjustment">
        <Box position="relative">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
            onClick={handleClick}
          >
            Create New
          </Button>
        </Box>
    </Header>
  )
}
