import Empty from '@/src/shared/components/Empty'
import {
  CheckCircle,
  RemoveCircle,
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import {IInquiryFormEntity} from "@/src/domains/inquiry-form/entity.ts";

const InquiryFormTableHeader = () => {
  return (
    <TableHead>
      <TableRow sx={{ paddingRight: 3, paddingLeft: 3 }}>
        <CustomCell>OH Adj Date</CustomCell>
        <CustomCell>OH Adj Number</CustomCell>
        <CustomCell>Depot Code</CustomCell>
        <CustomCell align="center">Activity Code</CustomCell>
        <CustomCell align="center">Section Code</CustomCell>
        <CustomCell align="center">GT Process Code</CustomCell>
        <CustomCell align="center">Approval State</CustomCell>
        <CustomCell align="center">Remark</CustomCell>
        <CustomCell align="center">Action</CustomCell>
      </TableRow>
    </TableHead>
  )
}

interface InquiryFormTableInterface {
  baseBoxList: IInquiryFormEntity[]
  isLoading?: boolean
  onDelete: (_id: string) => void
  onShowDetail: (_baseBox: any) => void
}

export default function InquiryFormTable({
                                      baseBoxList,
  isLoading,
}: InquiryFormTableInterface) {
  const data = baseBoxList
  const renderTableRows = () => {

    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <Box>
              <CircularProgress color="primary" />
            </Box>
          </TableCell>
        </TableRow>
      )
    }

    if(!data){
      return
    }

    if (data.length < 1) {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <Box>
              <Empty title="You don't have any base box" desc="" />
            </Box>
          </TableCell>
        </TableRow>
      )
    }

    return baseBoxList.map((baseBoxItem: IInquiryFormEntity) => {
      return (
        <TableRow key={baseBoxItem.id}>
          <CustomCell>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography>{baseBoxItem.uuid}</Typography>
            </Box>
          </CustomCell>
          <CustomCell>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography>{baseBoxItem.deviceUniqueId}</Typography>
            </Box>
          </CustomCell>
          <CustomCell>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography>{baseBoxItem.type}</Typography>
            </Box>
          </CustomCell>
          <CustomCell>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography>{baseBoxItem.slot}</Typography>
            </Box>
          </CustomCell>
        </TableRow>
      )
    })
  }

  return (
    <TableContainer>
      <Table sx={{ padding: 3 }} width="100%">
        <InquiryFormTableHeader />
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
    </TableContainer>
  )
}

const CustomCell = styled(TableCell)({
  padding: 24,
})
