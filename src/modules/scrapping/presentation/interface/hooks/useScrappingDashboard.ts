import ScrappingViewModel from "@/src/modules/scrapping/presentation/view-model";

export default function useScrappingDashboard() {
  const { actionModel, dataModel } = ScrappingViewModel()
  const { requestScrappingList } = actionModel()
  const { baseBoxList } = dataModel()
  const fetchScrappingList = async () => {
   await requestScrappingList()
  }

  const dashboard =[]


  return {
    fetchScrappingList,
    dashboard,
    baseBoxList,
  }
}
