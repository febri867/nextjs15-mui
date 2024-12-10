import React, {useState} from 'react'
import Empty from '@/src/shared/components/Empty'
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
    styled, IconButton, Modal, TablePagination, Button, MenuItem, Menu, Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {IInquiryFormEntity} from "@/src/domains/on-hand/entity.ts";
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import {router} from "next/client";

const InquiryFormTableHeader = () => {
  return (
    <TableHead>
      <TableRow sx={{backgroundColor : '#3c9f9a'}}>
          <CustomCell sx={{fontWeight: 'bold', color: 'white'}}></CustomCell>
          <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Depot Code</CustomCell>
          <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Request Date</CustomCell>
          <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Request No.</CustomCell>
        <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Requester ID</CustomCell>
        <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Section Code</CustomCell>
        <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Activity Code</CustomCell>
        <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>OH Adj. Completed Date</CustomCell>
        <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Scrap Instruction</CustomCell>
      </TableRow>
    </TableHead>
  )
}

interface InquiryFormTableInterface {
    scrappingList: IInquiryFormEntity[]
  isLoading?: boolean
  onDelete: (_id: string) => void
  onShowDetail: (_baseBox: any) => void
    role: string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Row = ({role, key, onhHandItem, handleOpenRemark, handleBeforeDelete, handleCheckbox}: any) => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null)
    const open = Boolean(anchor)
    const handleClose = () => {
        setAnchor(null)
    }
    const handleClickDetail = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(role==='superadmin'){
            setAnchor(event.currentTarget)
        } else {
            router.push('/on-hand/detail')
        }
    }
    const labelId = `scrapping-table-checkbox-${key}`;
    const onHandleCheckbox = (id) => {
        handleCheckbox(id)
    }
    return (
        <>
            <StyledTableRow key={onhHandItem.id}>
                <CustomCell>
                    <Box width={'85px'} display="flex" flexDirection="column" >
                        <Checkbox
                            onClick={()=>onHandleCheckbox(onhHandItem.id)}
                            color="primary"
                            checked={onhHandItem.isSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </Box>
                </CustomCell>
                <CustomCell>
                    <Box display="flex" flexDirection="column" >
                        <Typography>{onhHandItem.ohNumber}</Typography>
                    </Box>
                </CustomCell>
                <CustomCell>
                    <Box display="flex" flexDirection="column" >
                        <Typography>{onhHandItem.depCode}</Typography>
                    </Box>
                </CustomCell> <CustomCell>
                <Box display="flex" flexDirection="column" >
                    <Typography>{onhHandItem.actCode}</Typography>
                </Box>
            </CustomCell> <CustomCell>
                <Box display="flex" flexDirection="column" >
                    <Typography>{onhHandItem.secCode}</Typography>
                </Box>
            </CustomCell> <CustomCell>
                <Box display="flex" flexDirection="column" >
                    <Typography>{onhHandItem.gtProcessCode}</Typography>
                </Box>
            </CustomCell>
                <CustomCell>
                    <Box width={'110px'} display="flex" flexDirection="column" >
                        <Typography>{onhHandItem.approvalState}</Typography>
                    </Box>
                </CustomCell>
            </StyledTableRow>
            <Menu anchorEl={anchor} open={open} onClose={handleClose}>
                <MenuItem onClick={()=>router.push('/on-hand/detail')}>Detail View</MenuItem>
                <MenuItem
                    onClick={  ()=> router.push('/on-hand/approve')}
                >
                    Approve View
                </MenuItem>
                <MenuItem
                    onClick={  ()=> router.push('/on-hand/pic')}
                >
                    PIC View
                </MenuItem>
            </Menu></>
    )
}

export default function ScrappingTable({
                                           scrappingList,
  isLoading,
    role
}: any) {
  const [data, setData] = React.useState(scrappingList)
    const [openRemark, setOpenRemark] = React.useState(false);
    const handleClose = () => setOpenRemark(false);
    const [remark, setRemark] = React.useState<string>('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false)

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleCloseDelete = () => {
        setOpenDeleteConfirm(false)
    }

    const handleCheckbox = (id) => {
        setData((prevState) => prevState.map((i)=> {
            if(Number(i.id) === Number(id)){
                return ({
                    ...i,
                    isSelected: !i.isSelected
                })
            } else return i
        }))
    }

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
          <TableCell colSpan={9} align="center">
            <Box>
              <Empty title="You don't have any On-Hand list" desc="" />
            </Box>
          </TableCell>
        </TableRow>
      )
    }

    const handleOpenRemark = (remark) => {
        setRemark(remark)
        setOpenRemark(true)
    }

    const handleBeforeDelete = () => {
        setOpenDeleteConfirm(true)
    }

    return data.map((onhHandItem: IInquiryFormEntity, idx) => {
      return (<Row role={role}  key={idx} onhHandItem={onhHandItem} handleBeforeDelete={handleBeforeDelete} handleOpenRemark={handleOpenRemark} handleCheckbox={handleCheckbox} />
      )
    })
  }

  return (
    <TableContainer>
      <Table size={'small'} sx={{ padding: 3 }} width="100%">
        <InquiryFormTableHeader />
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={20}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                '.MuiInputBase-root': {
                    marginTop: 0
                }
            }}
        />
        <Modal
            open={openRemark}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton sx={{
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                }} onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Remark
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {remark}
                </Typography>
            </Box>
        </Modal>
        <Modal
            open={openDeleteConfirm}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton sx={{
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                }} onClick={handleCloseDelete}>
                    <CloseIcon/>
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure want to Delete ?
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent="flex-end"
                    marginTop={2}
                >
                    <Button variant={"outlined"} onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button sx={{marginLeft:'12px'}} variant={"contained"} onClick={handleCloseDelete}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    </TableContainer>
  )
}

const CustomCell = styled(TableCell)({
  padding:'16px',
})
