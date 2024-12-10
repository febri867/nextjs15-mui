import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, styled } from '@mui/material'

interface BreadcrumbInterface {
  items: React.ReactNode[]
}

export default function Breadcrumb({ items }: BreadcrumbInterface) {
  return (
    <CustomBreadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      {items}
    </CustomBreadcrumbs>
  )
}

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li .MuiLink-root': {
    color: theme.palette.text.primary,
    cursor: 'pointer',
  },
  '& .MuiBreadcrumbs-ol .MuiBreadcrumbs-li .MuiTypography-root:not(.MuiLink-root)': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}))
