import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import NextLink from 'next/link'

type RoutesType = {
  label: string
  url: string
  icon: string
  hasAccess: boolean
}

export interface SidebarPropsInterface {
  activeRoute: string
}

export default function Index({ activeRoute }: SidebarPropsInterface) {
  const theme = useTheme()

  const routes: RoutesType[] = [
    {
      label: 'Dashboard',
      url: '/home',
      icon: '/images/sidebar/icons/dashboard.svg',
      hasAccess: true,
    },
    {
      label: 'On-Hand Adjustment',
      url: '/on-hand',
      icon: '/images/sidebar/icons/asset.svg',
      hasAccess: true,
    },
    {
      label: 'Scrapping Instruction',
      url: '/scrapping',
      icon: '/images/sidebar/icons/framework.svg',
      hasAccess: true,
    },
    {
      label: 'Inquiry Form',
      url: '/inquiry-form',
      icon: '/images/sidebar/icons/questionnaire.svg',
      hasAccess: true,
    },
    {
      label: 'Performance Report',
      url: '/report',
      icon: '/images/sidebar/icons/policy.svg',
      hasAccess: true,
    },
    {
      label: 'User Management',
      url: '/users',
      icon: '/images/sidebar/icons/employee.svg',
      hasAccess: true,
    },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box overflow="auto">
        <List>
          {routes
            .filter((item) => Boolean(item.hasAccess))
            .map((item: RoutesType, index: number) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={NextLink} href={item.url}>
                  <Box
                    component={ListItemIcon}
                    sx={{
                      background:
                        activeRoute == item.label
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      width: 24,
                      height: 24,
                      minWidth: 40,
                      WebkitMask: `url(${item.icon}) left / contain no-repeat`,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          color: (theme) =>
                            activeRoute == item.label
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                        }}
                        fontSize="16px"
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Drawer>
  )
}
