import Breadcrumb from '@/src/shared/components/Breadcrumb'
import Header from '@/src/shared/components/Header'
import Panel from '@/src/shared/components/Panel'
import { InputText, Select } from '@/src/shared/components/Inputs'
import {Box, Divider, Grid, Link, Typography, Button, Modal, IconButton} from '@mui/material'
import React, {KeyboardEvent, useEffect} from 'react'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import {
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormReturn,
    UseFormSetValue, useFormState,
} from 'react-hook-form'
import useAddInquiryForm from '../../hooks/useAddInquiryForms.ts'
import type { BaseboxType } from '../../../view-model/redux/types'
import ItemListTable from "@/src/modules/on-hand/presentation/interface/components/inquiry-form/ItemListTable";
import { read, utils, writeFile } from "xlsx";
import TemplateExcel from './public/files/template/oh_template.xlsx'
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

/* load the codepage support library for extended support with older formats  */
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
// set_cptable(cptable);

const styleModal = {
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

export interface StepComponentInterface<T extends FieldValues> {
    register: UseFormRegister<T>
    formState: UseFormReturn['formState']
    getValues?: UseFormGetValues<T>
    setValue?: UseFormSetValue<T>
}

interface AddFormInterface {
    isEdit?: boolean
    data?: BaseboxType
}

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);

export default function AddForm({ data, isEdit = false, role = 'submitter' }: AddFormInterface) {
    // let role = 'submitter'
    // const role = 'approver'
    // if(typeof window === undefined){
    //     // role = localStorage.getItem('role')
    // }
    const VENDOR_TYPE = ['01', '02']
    const GT_PROCESS_CODE_TYPE = ['01', '02']
    const SECTION_CODE_TYPE = ['Q']
    const ACTIVITY_CODE_TYPE = ['S']
    const DEPOT_CODE_TYPE = ['01', '02']
    const inputFile = React.useRef(null)
    const inputEvidence = React.useRef(null)
    const [totalAmount, setTotalAmount] = React.useState(0)
    const baseObjItem = {
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
    const [itemList, setItemList] = React.useState([
        baseObjItem
    ])
    const [titleDialog, setTitleDialog] = React.useState<string>('');
    const [textDialog, setTextDialog] = React.useState<string>('');
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleClose = () => setOpenDialog(false);
    const [evidence, setEvidence] = React.useState<string>("")
    const [evidencePic, setEvidencePic] = React.useState<string>("")
    const [isValidate, setIsValidate] = React.useState(false)

    const [titleInput, setTitleInput] = React.useState<string>('');
    const [titleBody, setTitleBody] = React.useState<string>('');
    const [openModalInput, setOpenModalInput] = React.useState(false);
    const handleCloseModalInput = () => setOpenModalInput(false);
    const [reason,setReason] = React.useState('')
    const [formOH, setFormOH] = React.useState({
        'deptCode': '',
        'sectionCode': '',
        'activityCode': '',
        'gtProcessCode': '',
    })
    const handleChangeReason = (e)=>{
        const {
            value
        } = e.target
        setReason(value)
    }

    const breadcrumbItems = [
        <Link key="/on-hand" href="/on-hand">
            On-Hand Adjustment
        </Link>,
        <Typography key="/on-hand/add">
            {role ==='submitter' && 'Request On-Hand'}
            {role ==='approver' && 'Approval On Hand'}
            {role ==='pic' && 'PIC On Hand'}
        </Typography>,
    ]

    const {
        baseBoxForm,
        onInquiryFormSubmit,
    } = useAddInquiryForm()

    const {
        handleSubmit: handleSubmitInquiryForm,
        register: registerInquiryForm,
        formState: formStateInquiryForm,
        reset: resetInquiryForm,
    } = baseBoxForm

    useEffect(() => {
        if (typeof data !== 'undefined') {
            resetInquiryForm({ uuid: data.fullName, type: data.email })
        }
    }, [data])

    const { errors } = formStateInquiryForm

    const handleOnSubmit = (res) => {
        console.log(res)
    }

    const handleOnUpload = () => {
        inputFile.current.click()
    }

    const handleInputChange = async (e) => {
        console.log('file')
        const file = e.target.files[0]
        inputFile.current.value = null

        if (!file) return

        const data = await file.arrayBuffer()

        const wb = read(data)
        const ws = wb.Sheets[wb.SheetNames[0]]
        const result = utils.sheet_to_json(ws, {
            header: 1
        })
        console.log(JSON.stringify(result))

        const resConvert = []
        let totalAmount=0
        result.forEach((i, idx) => {
            if(idx>0 && i.length>0){
                resConvert.push({
                    reffNo: i[0],
                    docDate: i[1],
                    partNum: i[2],
                    partName: "Test",
                    sign: i[3],
                    qty: i[4],
                    amount: Number(i[4]) * Number(50000),
                    remark1: i[5],
                    remark2: i[6]
                })
                totalAmount += Number(i[6]) || 0
            }
        })
        setTotalAmount(totalAmount)
        setItemList(resConvert)
    }

    const handleDownloadTemplate = () => {
        const templateList = [{
            'DOC_REFF_NUMBER': '',
            'DOC_DATE': '',
            'PART_NO': '',
            '+/-': '',
            'QTY': '',
            'REMARK_1': '',
            'REMARK_2': '',

        }]
        const worksheet = utils.json_to_sheet(templateList);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Template List Items");
        writeFile(workbook, "Template List Items.xlsx", { compression: true });
    }

    const handleClickUploadEvidence =()=> {
        inputEvidence.current.click()
    }

    const handleUploadEvidence = (e) => {
        const file = e.target.files[0]
        if (!file) return
        // if(file.type !== "application/pdf"){
        //     setTitleDialog('File type only pdf !')
        //     setOpenDialog(true)
        //     return
        //     // console.log('File must PDF type')
        // }
        if(role==='pic'){
            setEvidencePic(file.name)
        } else {
            setEvidence(file.name)
        }
    }

    const handleValidateFromTable = (val = false) => {
        setIsValidate(val)
    }

    const handleReject = () => {
        setTitleInput('Reject')
        setOpenModalInput(true)
    }

    const handleRevise = () => {
        setTitleInput('Revise')
        setOpenModalInput(true)
    }

    const handleOnPartialComplete = () => {
        setTitleInput('Partial Complete')
        setTitleBody('Do you want to partially complete this request?')
        setOpenModalInput(true)
    }

    useEffect(() => {
        if(role === 'pic'){
            setItemList(
                [
                    {
                        "reffNo": "test1",
                        "docDate": '12/04/2023',
                        "partNum": "dsf7",
                        "partName": "Test",
                        "sign": "+",
                        "qty": 10,
                        "amount": 500000,
                        "remark1": "pecah",
                        "remark2": ''
                    },
                    {
                        "reffNo": "test2",
                        "docDate": '12/04/2023',
                        "partNum": "dsf8",
                        "partName": "Test",
                        "sign": "+",
                        "qty": 11,
                        "amount": 550000,
                        "remark1": "OTHERS",
                        "remark2": "asfasf",
                    },
                    {
                        "reffNo": "test3",
                        "docDate": '12/04/2023',
                        "partNum": "dsf9",
                        "partName": "Test",
                        "sign": "+",
                        "qty": 12,
                        "amount": 600000,
                        "remark1": "KARAT",
                        "remark2": ''
                    },
                    {
                        "reffNo": "test4",
                        "docDate": '12/04/2023',
                        "partNum": "dsf10",
                        "partName": "Test",
                        "sign": "+",
                        "qty": 13,
                        "amount": 650000,
                        "remark1": "PECAH",
                        "remark2": ''
                    },
                    {
                        "reffNo": "test5",
                        "docDate": '12/04/2023',
                        "partNum": "dsf10",
                        "partName": "Test",
                        "sign": "+",
                        "qty": 13,
                        "amount": 650000,
                        "remark1": "karat",
                        "remark2": ''
                    }
                ]
            )

            setFormOH({
                'deptCode': '01',
                'sectionCode': 'Q',
                'activityCode': 'S',
                'gtProcessCode': '01',
            })
        }
    }, []);

    const handleDownloadForm = () => {

        const listItemMutate = itemList.map((item, i) => ({
            'DEPOT_CODE': formOH.deptCode,
            'SECTION_CODE': formOH.sectionCode,
            'ACTIVITY_CODE': formOH.activityCode,
            'GT_PROCESS_CODE': formOH.gtProcessCode,
            'DOC_REFF_NUMBER': item.reffNo,
            'DOC_DATE': item.docDate,
            'PART_NO': item.partNum,
            'PART_NAME': item.partName,
            '+/-': item.sign,
            'QTY': item.qty,
            'AMOUNT': item.amount,
            'REMARK_1': item.remark1,
            'REMARK_2': item.remark2,

        }))
        const worksheet = utils.json_to_sheet(listItemMutate);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "List Items");
        writeFile(workbook, "List Items.xlsx", { compression: true });
    }

    return (
        <Panel noPadding containerProps={{display: 'flex', flexDirection: 'column'}}>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmitInquiryForm(onInquiryFormSubmit)}
            >
                <Box
                    padding={3}
                    display="flex"
                    flexDirection="column"
                    gap="16px"
                    // marginBottom={12}
                >
                    <Breadcrumb items={breadcrumbItems}/>
                    <Header title={!isEdit ? 'On-Hand Adjusment Form' : 'Edit InquiryForm'}/>

                    <Grid
                        padding="16px 0"
                        // display="flex"
                        // flexDirection="column"
                        container
                        spacing="16px"
                    >
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <Select
                                value={formOH.deptCode}
                                label="Depot Code*"
                                placeholder={
                                    'Choose Depot Code'
                                }
                                disabled={role !== 'submitter'}
                                options={DEPOT_CODE_TYPE}
                                // register={registerInquiryForm('deviceUniqueId')}
                                // errorMessage={errors?.deviceUniqueId?.message as string}
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <Select
                                value={formOH.sectionCode}
                                label="Section Code*"
                                placeholder={
                                    'Choose Section Code'
                                }
                                disabled={role !== 'submitter'}
                                options={SECTION_CODE_TYPE}
                                // register={registerInquiryForm('deviceUniqueId')}
                                // errorMessage={errors?.deviceUniqueId?.message as string}
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <InputText
                                label="Marker Code"
                                placeholder="ex: 01"
                                type="text"
                                value={"A"}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <InputText
                                label="Request Date"
                                placeholder="ex: 01"
                                type="text"
                                value={dayjs().format('DD/MM/YYYY')}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        padding="16px 0"
                        // display="flex"
                        // flexDirection="column"
                        container
                        spacing="16px"
                    >
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <Select
                                label="Activity Code*"
                                placeholder={
                                    'ex: S'
                                }
                                disabled={role !== 'submitter'}
                                options={ACTIVITY_CODE_TYPE}
                                value={formOH.activityCode}
                                // register={registerInquiryForm('deviceUniqueId')}
                                // errorMessage={errors?.deviceUniqueId?.message as string}
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <Select
                                label="GT Process Code*"
                                placeholder={
                                    'ex: 01'
                                }
                                value={formOH.gtProcessCode}
                                disabled={role !== 'submitter'}
                                options={GT_PROCESS_CODE_TYPE}
                                // register={registerInquiryForm('deviceUniqueId')}
                                // errorMessage={errors?.deviceUniqueId?.message as string}
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <InputText
                                variant={"standard"}
                                label="Requester ID"
                                placeholder="ex: 01"
                                type="text"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={3} display="flex" flexDirection="column" gap="16px">
                            <InputText
                                label="Requester No"
                                placeholder="ex: 01"
                                type="text"
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Box>
                {role === 'submitter' && <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    margin={"0 0 16px 0"}
                    padding={'0 24px 0 0'}
                >
                    <input hidden ref={inputFile} onChange={handleInputChange} type="file" className="form-control"
                           id="file" name="file"/>
                    <Button
                        onClick={handleOnUpload}
                        size="large"
                        variant="contained"
                        type="submit"
                        
                        sx={{
                            backgroundColor: '#70a6ff',
                            marginLeft: '16px'
                        }}
                    >
                        Upload Excel Form
                    </Button>
                    <Button
                        onClick={handleDownloadTemplate}
                        size="large"
                        
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#D49B54',
                            marginLeft: '16px'
                        }}
                    >
                        Download Template
                        {/*<a href={TemplateExcel} download="template.xlsx">Download</a>*/}
                    </Button>
                </Box>}
                {role === 'pic' && <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    margin={"0 0 16px 0"}
                    padding={'0 24px 0 0'}
                >
                    <Button
                        
                        onClick={handleDownloadForm}
                        size="large"
                        variant="contained"
                        type="submit"
                        sx={{
                            backgroundColor: '#D49B54',
                            color: 'white',
                            marginLeft: '16px'
                        }}
                    >
                        Download Form
                        {/*<a href={TemplateExcel} download="template.xlsx">Download</a>*/}
                    </Button>
                </Box>}
                <Divider/>
                <Box
                    padding={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                        display="flex"
                        alignItems="start"
                        flexDirection="column"
                        width="50%"
                        paddingRight={2}
                        gap={1}
                    >
                    </Box>
                </Box>
            </Box>
            <Box>
                <ItemListTable
                    role={role}
                    baseBoxList={itemList}
                    isLoading={false}
                    checkValidateData={handleValidateFromTable}
                    onDelete={() => {
                    }}
                    onShowDetail={() => {
                    }
                    }
                    totalAmount={totalAmount}
                />
            </Box>
            <Typography
                textAlign={'right'}
                marginRight={2}
                marginTop={4}
            >
                Total Amount 10 - 50 mio (<span style={{color: 'orange'}}>yellow</span>); > 50 mio (<span
                style={{color: 'red'}}>red</span>)
            </Typography>
            <Typography
                textAlign={'left'}
                marginleft={2}
                marginTop={4}
            >
                <span
                    style={{color: 'red', marginLeft: '24px'}}>*</span> OH Adj. attachment (*.pdf)
                {
                    role === 'submitter' && <Button  sx={{marginLeft: '32px'}}
                        variant={"contained"}
                        onClick={handleClickUploadEvidence}
                    >Upload</Button>
                }
                <input hidden ref={inputEvidence} accept="application/pdf" onChange={handleUploadEvidence} type="file" className="form-control"
                       id="file" name="file"/>
            </Typography>
            {
                (role=== 'approver' || role=== 'pic') &&
                <Typography sx={{fontSize: '11px', marginLeft: '40px', marginTop:'12px'}}>
                    <Button
                        
                        sx={{marginRight: '16px', width: '90px'}}
                        disabled={role === 'submitter'}
                        variant={"contained"}
                        size={'small'}
                        // onClick={handleClickUploadEvidence}
                    >Download</Button><i>{evidence}</i>
                </Typography>
            }
            {
                (role === 'pic') &&
                <>
                    <Typography
                        textAlign={'left'}
                        marginleft={2}
                        marginTop={4}
                    >
                <span
                    style={{color: 'red', marginLeft: '24px'}}>*</span> GT Process Evidence
                    </Typography>
                <Typography sx={{fontSize: '11px', marginLeft: '40px', marginTop:'12px'}}>
                    <> <Button
                        
                        sx={{marginRight: '16px', width: '90px'}}
                        variant={"contained"}
                        size={'small'}
                               onClick={handleClickUploadEvidence}
                    >Upload</Button>
                        <input hidden ref={inputEvidence} accept="image/*" onChange={handleUploadEvidence} type="file"
                               className="form-control"
                               id="file" name="file"/></><i>{evidencePic}</i>
                </Typography>
                </>
            }
            <Box padding={'24px'} justifyContent={'flex-end'} display="flex" alignItems="end" gap={2}>
                {
                    role === 'submitter' &&
                    <>
                        <Button
                            
                            onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#70a6ff',
                                marginLeft: '16px',
                                minWidth: '120px'
                            }}
                            disabled={evidence === "" || !isValidate}
                        >
                            Save
                        </Button>
                        <Button
                            
                            onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="save"
                            sx={{
                                minWidth: '120px'
                            }}
                        >
                            Submit
                        </Button>
                    </>
                }
                {
                    role==='approver' &&
                    <>
                        <Button
                            
                            onClick={handleReject}
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: 'orangered',
                                color: 'white',
                                marginLeft: '16px',
                                minWidth: '120px'
                            }}
                        >
                            Reject
                            {/*<a href={TemplateExcel} download="template.xlsx">Download</a>*/}
                        </Button>
                        <Button
                            
                            onClick={handleRevise}
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#70a6ff',
                                minWidth: '120px'
                            }}
                        >
                            Revise
                        </Button>
                        <Button
                            
                            // onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="save"
                            sx={{
                                minWidth: '120px'
                            }}
                        >
                            Accept
                        </Button>
                    </>
                }
                {
                    role === 'detail' &&
                    <>
                        <Button
                            
                            onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#70a6ff',
                                marginLeft: '16px',
                                minWidth: '120px'
                            }}
                            disabled={evidence === "" || !isValidate}
                        >
                            Cancel
                        </Button>
                        <Button
                            
                            onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="save"
                            sx={{
                                minWidth: '120px'
                            }}
                        >
                            Update
                        </Button>
                    </>
                }
                {
                    role === 'pic' &&
                    <>
                        <Button
                            
                            onClick={handleOnSubmit}
                            size="large"
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#70a6ff',
                                color: 'white',
                                marginLeft: '16px',
                                minWidth: '120px'
                            }}
                            disabled={evidencePic=== ''}
                        >
                            Full Complete
                        </Button>
                        <Button
                            onClick={handleOnPartialComplete}
                            size="large"
                            variant="contained"
                            type="save"
                            sx={{
                                minWidth: '120px'
                            }}
                        >
                            Partial Complete
                        </Button>
                    </>
                }
            </Box>
            <Modal
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <IconButton sx={{
                        position: 'absolute',
                        right: '6px',
                        top: '6px',
                    }} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {titleDialog}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {textDialog}
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openModalInput}
                onClose={handleCloseModalInput}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Box sx={{
                        position: 'absolute',
                        display: 'flex',
                        left: '0',
                        top: '0',
                        right: '0',
                        padding: '5px',
                        justifyContent: 'space-between',
                        backgroundColor: (theme)=>theme.palette.primary.main,
                        color: 'white'
                    }}>
                        <Typography variant={'h6'}>
                            {titleInput}
                        </Typography>
                        <IconButton onClick={handleCloseModalInput}>
                            <CloseIcon style={{ color: 'white' }}/>
                        </IconButton>
                    </Box>
                    <Typography component={'p'} marginTop={'40px'} fontSize={'16px'}>
                        {titleBody}
                    </Typography>
                    <Typography sx={{marginTop: '16px'}} id="modal-modal-title" component="p">
                        Please input reason<span style={{color: 'red'}}>*</span>
                    </Typography>
                    <Textarea onChange={handleChangeReason} value={reason} sx={{width: '100%'}} aria-label="minimum height" minRows={3}/>
                   <Box
                       sx={{display: 'flex',
                           justifyContent: 'flex-end',
                   margin:'24px 0'}}
                   >
                       <Button
                           
                           onClick={handleCloseModalInput}
                           size="large"
                           variant="contained"
                           type="submit"
                           sx={{
                               backgroundColor: '#70a6ff',
                               minWidth: '120px'
                           }}
                       >
                           Cancel
                       </Button>
                       <Button
                           
                           onClick={handleCloseModalInput}
                           size="large"
                           variant="contained"
                           type="save"
                           sx={{
                               minWidth: '120px',
                               marginLeft: '16px',
                           }}
                           disabled={reason === ''}
                       >
                           Ok
                       </Button>
                   </Box>
                </Box>
            </Modal>
        </Panel>
    );
}
