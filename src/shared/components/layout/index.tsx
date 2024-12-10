import type { SidebarPropsInterface } from 'components/sidebar'
import Sidebar from '@/components/sidebar'
import Toolbar from '@/components/toolbar'
import { Box, Toolbar as MuiToolbar } from '@mui/material'
import { FC } from 'react'

export interface CommonLayoutInterface {
    children: React.ReactNode
    sidebarProps: SidebarPropsInterface
    noPadding?: boolean
}

const CommonLayout: FC<CommonLayoutInterface> = ({
     children,
     sidebarProps,
     noPadding = false,
 }) => {
    return (
        <Box sx={{ backgroundColor: '#E8E9EA', minHeight: '100vh' }} display="flex">
            <Toolbar />
            <Sidebar {...sidebarProps} />
            <Box component="main" sx={{ flexGrow: 1, p: noPadding ? 0 : 3 }}>
                <MuiToolbar />
                {children}
            </Box>
        </Box>
    )
}

export default CommonLayout
