import React from 'react'
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
    styled, TablePagination, IconButton,
} from '@mui/material'
import {IInquiryFormEntity} from "@/src/domains/on-hand/entity.ts";
import {InputText, Select} from "@/components/Inputs";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const InquiryFormTableHeader = ({role = 'submitter'}): any => {
    return (
        <TableHead>
            <TableRow sx={{backgroundColor : '#3c9f9a'}}>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Doc.Reff Number</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Doc Date</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Parts No.</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Parts Name</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>+ / -</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Qty</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Amount</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white', minWidth: '80px'}}>Remark 1</CustomCell>
                <CustomCell sx={{fontWeight: 'bold', color: 'white'}}>Remark 2</CustomCell>
                {
                    role === 'submitter' &&  <CustomCell sx={{fontWeight: 'bold', color: 'white'}}></CustomCell>
                }
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const VENDOR_TYPE = ['PECAH', 'KARAT', 'OTHERS']
const SIGN_TYPE = ['+', '-']

export default function ItemListTable({
                                          checkValidateData,
                                             baseBoxList,
                                             isLoading,
                                          tot = 0,
    role='submitter'
                                         }: any) {
    const [data, setData] = React.useState(baseBoxList)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    // const role = 'submitter'
    // const role = 'approver'
    // const role = localStorage.getItem('role')
    const [totalAmount, setTotalAmount] = React.useState<number>(tot)
    const price = 50000
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeValTable =(idx, key, e)=> {
        let {
            value
        } = e.target
        setData(prevState => prevState.map((item, i) => {
            if(i === idx){
                if(key === "remark1" && value !== "OTHERS"){
                    return({
                        ...item,
                        [key]: value,
                        remark2: ""
                    })
                } else {
                    if(key === "qty"){
                        value = Math.abs(value).toString()
                        return ({
                            ...item,
                            amount: Number(value) * Number(price),
                            [key]: value,
                        })
                    } else {
                        return ({
                            ...item,
                            [key]: value,
                        })
                    }
                }
            } else {
                return item;
            }
        }));
    }

    React.useEffect(()=>{
        let total = 0
        const dataSum = data
        let isValidate = true
        dataSum.forEach((i)=>{
            if(i.reffNo === ""){
                isValidate = false
            } if(i.partNum === ""){
                isValidate = false
            } if(i.partName === ""){
                isValidate = false
            } if(i.sign === ""){
                isValidate = false
            } if(i.qty === ""){
                isValidate = false
            } if(i.amount === ""){
                isValidate = false
            } if(i.remark1 === ""){
                isValidate = false
            } if(i.remark1 === "OTHERS" && i.remark2 === ""){
                isValidate = false
            }
            total += (Number(i.qty) * Number(price)) || 0
            // if(i.sign === '+'){
            //     total += (Number(i.qty) * Number(price)) || 0
            // } else if(i.sign === '-'){
            //     total -= (Number(i.qty) * Number(price)) || 0
            // }

        })
        setTotalAmount(total)
        checkValidateData(isValidate)
    },[data])

    React.useEffect(()=> {
        setData(baseBoxList)
    }, [baseBoxList])

    const handleActionItem = (idx, type) => {
        switch (type) {
            case 'add':
                const item = {
                    reffNo: '',
                    docDate: '',
                    partNum: '',
                    partName: 'Test',
                    sign: '+',
                    qty: '',
                    amount: '',
                    remark1: '',
                    remark2: ''
                }
                const newData = data.toSpliced(idx + 1, 0, item)
                setData(newData)
                break;
                case 'delete':
                    setData((prevState) => prevState.filter((i, index) => {
                        console.log(idx === 0,prevState.length > 0 )
                        if(idx !== index || (idx === 0 && prevState.length === 1)){
                            return prevState
                        }
                    }))
                    break;
            default:
                return
        }
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

        return data.map((onhHandItem: any, idx) => {
            return (
                <StyledTableRow key={onhHandItem.id}>
                    <CustomCell>
                        <Box width={'85px'} display="flex" flexDirection="column" >
                            <InputText
                                disabled={role !== 'submitter'}
                                onChange={(val)=> handleChangeValTable(idx, 'reffNo',  val)}
                                variant={'standard'}
                                type="text"
                                value={onhHandItem.reffNo}
                            />
                        </Box>
                    </CustomCell>
                    <CustomCell>
                        <Box display="flex" flexDirection="column" >
                            <InputText
                                disabled={role !== 'submitter'}
                                onChange={(val)=> handleChangeValTable(idx, 'docDate', val)}
                                variant={'standard'}
                                type="text"
                                value={onhHandItem.docDate}
                            />
                        </Box>
                    </CustomCell>
                    <CustomCell>
                        <Box display="flex" flexDirection="column" >
                            <InputText
                                disabled={role !== 'submitter'}
                                onChange={(val)=> handleChangeValTable(idx, 'partNum', val)}
                                variant={'standard'}
                                type="text"
                                value={onhHandItem.partNum}
                            />
                        </Box>
                    </CustomCell> <CustomCell>
                    <Box display="flex" flexDirection="column" >
                        <Typography>{onhHandItem.partName}</Typography>
                    </Box>
                </CustomCell> <CustomCell>
                    <Box sx={{
                        '.MuiInputBase-root': {
                            marginTop: 0
                        }
                    }} display="flex" flexDirection="column" >
                        <Select
                            disabled={role !== 'submitter'}
                            placeholder={
                                'None'
                            }
                            value={onhHandItem.sign}
                            options={SIGN_TYPE}
                            onChange={(e) => handleChangeValTable(idx, 'sign', e)}
                            // register={registerInquiryForm('deviceUniqueId')}
                            // errorMessage={errors?.deviceUniqueId?.message as string}
                        />
                    </Box>
                </CustomCell> <CustomCell>
                    <Box display="flex" flexDirection="column" >
                        <InputText
                            disabled={role !== 'submitter'}
                            onChange={(val)=> handleChangeValTable(idx, 'qty', val)}
                            variant={'standard'}
                            type="number"
                            value={onhHandItem.qty}
                        />
                    </Box>
                </CustomCell>
                    <CustomCell>
                        <Box width={'110px'} display="flex" flexDirection="column" >
                           <Typography>{(onhHandItem.amount).toLocaleString('id-ID')}</Typography>
                        </Box>
                    </CustomCell>
                    <CustomCell>
                        <Box
                            sx={{
                            '.MuiInputBase-root': {
                                marginTop: 0
                            }
                        }}
                             display="flex" flexDirection="column" >
                            <Select
                                disabled={role !== 'submitter'}
                                placeholder={
                                    'None'
                                }
                                value={(onhHandItem.remark1).toString().toUpperCase()}
                                options={VENDOR_TYPE}
                                onChange={(e) => handleChangeValTable(idx, 'remark1', e)}
                                // register={registerInquiryForm('deviceUniqueId')}
                                // errorMessage={errors?.deviceUniqueId?.message as string}
                            />
                        </Box>
                    </CustomCell><CustomCell>
                    <Box display="flex" flexDirection="row" >
                        <InputText
                            variant={'standard'}
                            type="text"
                            value={onhHandItem.remark2}
                            onChange={(val)=> handleChangeValTable(idx, 'remark2', val)}
                            disabled={onhHandItem.remark1 !== 'OTHERS' || role !== 'submitter'}
                        />
                    </Box>
                </CustomCell>
                    {
                        role === 'submitter' &&  <CustomCell>
                            <Box display="flex" flexDirection="row" >
                                <IconButton onClick={()=>handleActionItem(idx, 'add')}>
                                    <AddIcon/>
                                </IconButton>
                                <IconButton onClick={()=>handleActionItem(idx, 'delete')}>
                                    <RemoveIcon/>
                                </IconButton>
                            </Box>
                        </CustomCell>
                    }
                </StyledTableRow>
            )
        })
    }

    return (
        <TableContainer>
            <Table size={'small'} sx={{ padding: 3 }} width="100%">
                <InquiryFormTableHeader role={role} />
                <TableBody>{renderTableRows()}
                    <TableRow>
                        <TableCell align={"center"} sx={{fontWeight: 'bold'}} colSpan={6}>Total</TableCell>
                        <TableCell align="left" sx={{backgroundColor: totalAmount > 50000000 ? 'orangered': totalAmount > 10000000 ? 'yellow' : 'inherit', fontWeight: 'bold'}}>{totalAmount.toLocaleString('id-ID')}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/*<TablePagination*/}
            {/*    rowsPerPageOptions={[5, 10, 25]}*/}
            {/*    component="div"*/}
            {/*    count={20}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*    sx={{*/}
            {/*        '.MuiInputBase-root': {*/}
            {/*            marginTop: 0*/}
            {/*        }*/}
            {/*    }}*/}
            {/*/>*/}
        </TableContainer>
    )
}

const CustomCell = styled(TableCell)({
    padding:'16px',
})
