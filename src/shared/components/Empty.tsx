import { Box, Typography } from '@mui/material'
// import NextImage from 'next/image'

interface EmptyPropsInterface {
  title: string
  desc: string
}

export default function Empty({ title, desc }: EmptyPropsInterface) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      {/*<img*/}
      {/*  src="/images/empty-illustration.png"*/}
      {/*  alt="empty"*/}
      {/*  width={136}*/}
      {/*  height={102}*/}
      {/*/>*/}
      <Typography fontWeight={600} my={1}>
        {title}
      </Typography>
      <Typography>{desc}</Typography>
    </Box>
  )
}
