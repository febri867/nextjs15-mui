import InquiryFormViewModel from "@/src/modules/inquiry-form/presentation/view-model";

export default function useInquiryFormDashboard() {
  const { actionModel, dataModel } = InquiryFormViewModel()
  const { requestInquiryFormList } = actionModel()
  const { baseBoxList } = dataModel()
  const fetchInquiryFormList = async () => {
   await requestInquiryFormList()
  }

  const dashboard =[]


  return {
    fetchInquiryFormList,
    dashboard,
    baseBoxList,
  }
}
