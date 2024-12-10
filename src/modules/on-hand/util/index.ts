import InquiryFormFetcher from '../fetcher/fetcher';
import InquiryFormUseCaseImpl from '../usecase/usecaseImpl';

export const fetcher = new InquiryFormFetcher();
export const usecase = new InquiryFormUseCaseImpl(fetcher);
