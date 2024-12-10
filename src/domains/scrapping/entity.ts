import { z } from 'zod'


export interface IInquiryFormEntity {
    id: number,
    uuid: string,
    deviceUniqueId: string,
    type: string,
    slot: number,
}

export const InquiryFormEntity = z.object({
    id: z.number(),
    uuid: z.string(),
    deviceUniqueId: z.string({
        invalid_type_error: 'Invalid input type',
        required_error: 'Please fill this field',
    }),
    type: z.string({
        invalid_type_error: 'Invalid input type',
        required_error: 'Please fill this field',
    }),
    slot: z.number({
        invalid_type_error: 'Invalid input type',
        required_error: 'Please fill this field',
    })
})
export const InquiryFormEntities: z.ZodType<IInquiryFormEntity[]> =z.array(InquiryFormEntity)

export type InquiryFormEntityType = z.infer<typeof InquiryFormEntity>

export const InquiryFormForm = InquiryFormEntity.pick({
    deviceUniqueId: true,
    type:true,
    // slot: true,
})

export interface InquiryFormListResponse extends GenericResponseInterface {
    devices: InquiryFormEntityType[]
}
