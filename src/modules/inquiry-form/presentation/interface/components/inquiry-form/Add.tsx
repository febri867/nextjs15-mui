import Breadcrumb from '@/src/shared/components/Breadcrumb'
import Header from '@/src/shared/components/Header'
import Panel from '@/src/shared/components/Panel'
import { InputText } from '@/src/shared/components/Inputs'
import { Box, Divider, Grid, Link, Typography, Button } from '@mui/material'
import { useEffect } from 'react'
import type {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form'
import useAddInquiryForm from '../../hooks/useAddInquiryForms.ts'
import type { BaseboxType } from '../../../view-model/redux/types'

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

export default function AddForm({ data, isEdit = false }: AddFormInterface) {
  const breadcrumbItems = [
    <Link key="/inquiry-forms" href="/baseboxs">
      InquiryForm Management
    </Link>,
    <Typography key="/baseboxs/form">
      {!isEdit ? 'Add InquiryForm' : 'Edit InquiryForm'}
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

  return (
    <Panel noPadding containerProps={{ display: 'flex', flexDirection: 'column' }}>
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
          marginBottom={12}
        >
          <Breadcrumb items={breadcrumbItems} />
          <Header title={!isEdit ? 'Add InquiryForm' : 'Edit InquiryForm'} />
          <Typography sx={{ marginTop: -1 }} fontSize="16px" color="text.primary">
            {!isEdit ? 'Input new InquiryForm data in here' : 'Edit InquiryForm data'}
          </Typography>

          <Grid
            padding="16px 0"
            display="flex"
            flexDirection="column"
            container
            spacing="16px"
          >
            <Grid item xs={6} display="flex" flexDirection="column" gap="16px">
            <InputText
                label="Device Uniq ID"
                placeholder="rDcEGbdg2T"
                type="text"
                register={registerInquiryForm('deviceUniqueId')}
                errorMessage={errors?.deviceUniqueId?.message as string}
            />
              <InputText
                  label="InquiryForm Type"
                  placeholder=""
                  type="text"
                  register={registerInquiryForm('type')}
                  errorMessage={errors?.type?.message as string}
              />
              <InputText
                  label="Slot"
                  placeholder="2"
                  type="number"
                  register={registerInquiryForm('slot')}
                  errorMessage={errors?.slot?.message as string}
              />

            </Grid>
          </Grid>
        </Box>
        <Divider />
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
            <Box display="flex" alignItems="center" gap={2}>
        <Button
            onClick={handleOnSubmit}
            size="large"
            variant="contained"
            type="submit"
        >
          Submit
        </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Panel>
  )
}
