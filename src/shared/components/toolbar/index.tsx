import { AccountCircle } from '@mui/icons-material'
import {
  AppBar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar as MuiToolbar, Typography,
} from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Index(props) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const open = Boolean(anchor)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setAnchor(null)
  }

  const router = useRouter()

  const logout = () =>{
    router.push('/auth/login')
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <MuiToolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Link component={NextLink} href="/home">
          <NextImage
            src="/images/ic-toyota.png"
            alt="SPLD"
            width={60}
            height={50}
          />
        </Link>
        {/*<Typography variant="h6" component="div">TAM SPLD</Typography>*/}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          sx={{ marginLeft: 'auto' }}
          onClick={handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu anchorEl={anchor} open={open} onClose={handleClose}>
          <MenuItem>My Profile</MenuItem>
          <MenuItem
            sx={{ color: (theme) => theme.palette.error.main }}
            onClick={logout}
          >
            Logout
          </MenuItem>
        </Menu>
      </MuiToolbar>
    </AppBar>
  )
}
