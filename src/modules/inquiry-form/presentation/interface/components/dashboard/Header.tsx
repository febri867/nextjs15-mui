import Header from '@/src/shared/components/Header'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Box, Button, Menu, MenuItem } from '@mui/material'
// import { useRouter } from 'next/router'
import { useState } from 'react'
import useInquiryFormDashboard from '../../hooks/useInquiryFormDashboard.ts'

export default function DashboardHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuWidth, setMenuWidth] = useState<number>(0)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuWidth(event.currentTarget.clientWidth)
  }

  const handleClose = () => setAnchorEl(null)
  const handleMenuClick = () => {
    handleClose()
  }

  // const { hasWriteAccess } = useBaseboxDashboard()

  const options = [
    { label: 'Add InquiryForm', url: '/inquiry-form/add' },
    // { label: 'Add Bulk Basebox', url: '/user/import' },
  ]

  // const router = useRouter()

  return (
    <Header title="InquiryForm Management">
        <Box position="relative">
          <Button
            variant="contained"
            size="large"
            endIcon={<KeyboardArrowDown />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
            }}
            onClick={handleClick}
          >
            Choose Action
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleMenuClick}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                display: 'block',
                width: menuWidth,
              },
              elevation: 1,
            }}
          >
            {options.map((item, index) => (
              <MenuItem key={index} onClick={() => {}}>
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
    </Header>
  )
}
