import React from 'react'
import Confirmation from '@/src/shared/components/Confirmation'
import {InputText, Select} from '@/src/shared/components/Inputs'
import Panel from '@/src/shared/components/Panel'
import {Box, Divider, Typography, InputLabel, Grid, Button} from '@mui/material'
import { KeyboardEvent, memo, useState } from 'react'
import Table from './ScrappingTable.tsx'
import useScrappingDashboard from "@/src/modules/scrapping/presentation/interface/hooks/useScrappingDashboard.ts";
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

interface DateInputInterface {
    label: string
    id: string
    value: string
    onChange: (value: string) => void
}

const CustomDateInput = ({ label, id, value, onChange }: DateInputInterface) => {
    const [date, setDate] = useState<Dayjs | null>(dayjs(value))
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
            <InputLabel shrink htmlFor={id}>
                {label}
            </InputLabel>
            <DatePicker
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        sx: {
                            marginTop: '-38px',
                        },
                    },
                }}
                value={date}
                onChange={(newValue) => {
                    setDate(newValue)
                    onChange(newValue?.toISOString() || '')
                }}
            />
        </LocalizationProvider>
    )
}

const DateInput = memo(CustomDateInput)

function DashboardScrappingList( {role}: any) {
    const [rangeDate, setRangeDate] = React.useState({
        startDate: new Date(),
        endDate: new Date()
    })
  const {
      scrappingList,
    fetchScrappingList,
  } = useScrappingDashboard()
    const SECTION_CODE_TYPE = ['Q']
  const [showConfirmation, setShowConfirmation] = useState<{
    id?: string
    show: boolean
  }>({ id: undefined, show: false })


  React.useEffect(() => {
      fetchScrappingList()
  }, [])

  return (
    <Panel noPadding containerProps={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        padding={3}
        sx={{
          '& input': {
            marginTop: '0px',
          },
        }}
      >
          <Box>
          <Grid margin={'32px 0'} container>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    justifyContent="space-between">
                  <Typography fontWeight={"bold"} >Start Date :</Typography>
                  <DateInput
                      id="start"
                      label=""
                      value={rangeDate.startDate.toString()}
                      onChange={(value) => setRangeDate((prevState) => ({
                          ...prevState,
                          startDate: new Date(dayjs(value).toISOString() as string),
                      }))}
                  />
              </Grid>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    padding={"0 0 0 12px"}
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={'-15px'}
              >
                  <Typography fontWeight={"bold"} >Depot Code :</Typography>
                  <InputText
                      placeholder="ex: 01"
                      type="text"
                      // icon={{
                      //     position: 'end',
                      //     name: 'search',
                      // }}
                      sx={{
                          maxWidth: '450px',
                          '& .MuiInputBase-root': {
                              marginTop: '0px',
                          },
                      }}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                              e.preventDefault()
                          }
                      }}
                  />
              </Grid>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    sx={{
                        '.MuiFormControl-root': {
                            width: '56%'
                        }
                    }}
                    padding={"0 0 0 12px"}
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={'-15px'}>
                  <Typography fontWeight={"bold"} >Section Code :</Typography>
                  <Select
                      // value={formOH.sectionCode}
                      // label="Section Code*"
                      placeholder={
                          'Choose Section Code'
                      }
                      // disabled={role !== 'submitter'}
                      options={SECTION_CODE_TYPE}
                      // register={registerInquiryForm('deviceUniqueId')}
                      // errorMessage={errors?.deviceUniqueId?.message as string}
                  />
              </Grid>
          </Grid>
          <Grid margin={'32px 0'} container>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    justifyContent="space-between">
                  <Typography fontWeight={"bold"} >End Date :</Typography>
                  <DateInput
                      id="start"
                      label=""
                      value={rangeDate.startDate.toString()}
                      onChange={(value) => setRangeDate((prevState) => ({
                          ...prevState,
                          endDate: new Date(dayjs(value).toISOString() as string),
                      }))}
                  />
              </Grid>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    padding={"0 0 0 12px"}
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={'-15px'}
              >
                  <Typography fontWeight={"bold"} >Request No :</Typography>
                  <InputText
                      // placeholder="ex: 01"
                      type="text"
                      // icon={{
                      //     position: 'end',
                      //     name: 'search',
                      // }}
                      sx={{
                          maxWidth: '450px',
                          '& .MuiInputBase-root': {
                              marginTop: '0px',
                          },
                      }}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                              e.preventDefault()
                          }
                      }}
                  />
              </Grid>
              <Grid item md={4} display="flex"
                    flexDirection="row"
                    padding={"0 0 0 12px"}
                    justifyContent="space-between"
                    alignItems="center"
                    marginTop={'-15px'}
              >
                  <Typography fontWeight={"bold"} >Requester ID :</Typography>
                  <InputText
                      placeholder="ex: email@domain.com"
                      type="text"
                      // icon={{
                      //     position: 'end',
                      //     name: 'search',
                      // }}
                      sx={{
                          maxWidth: '450px',
                          '& .MuiInputBase-root': {
                              marginTop: '0px',
                          },
                      }}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                              e.preventDefault()
                          }
                      }}
                  />
              </Grid>
          </Grid>
          </Box>
          <Button variant={"contained"}>
              Search
          </Button>
      </Box>
      <Divider />
      <Table
          role={role}
        scrappingList={[
            {
                "id":1,
                "isSelected": false,
                "depCode":"10/10/2024",
                "reqDate":"Q123S",
                "reqNum":"01",
                "reqId":"S",
                "secCode":"Q",
                "activityCode":"01",
                "ohCompletedDate":"APPROVED-01",
                "scrapInstruction":"test"
            }
        ]}
        isLoading={false}
        onDelete={(id: string) => setShowConfirmation({ id, show: true })}
        onShowDetail={() =>
            {}
        }
      />
      <Confirmation
        open={showConfirmation.show}
        handleClose={() => setShowConfirmation({ id: undefined, show: false })}
        handleConfirm={() => {
          setShowConfirmation({ id: undefined, show: false })
        }}
        title="Delete Scrapping"
        message="Are you sure you want to delete this Scrapping?"
        variant="error"
        isLoading={false}
      />
    </Panel>
  )
}

export default memo(DashboardScrappingList)
