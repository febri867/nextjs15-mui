import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {InquiryFormEntityType, InquiryFormForm} from "@/src/domains/inquiry-form/entity.ts";

export default function useAddInquiryForm() {
   const [payload, setPayload] = useState<Partial<InquiryFormEntityType>>({})

  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const submitBasebox = async () => {
    setSubmitting(true)
  }

  const baseBoxForm = useForm<InquiryFormEntityType>({
    resolver: zodResolver(InquiryFormForm),
    mode: 'all',
  })

  const onInquiryFormSubmit = (payload: InquiryFormEntityType) => {
    setPayload((prev) => ({ ...prev, ...payload }))
  }

  return {
    submitBasebox,
    isSubmitting,
    baseBoxForm,
    payload,
    onInquiryFormSubmit,
  }
}
