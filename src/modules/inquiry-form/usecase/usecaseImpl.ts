
import { HTTPResponse } from 'src/domains/core/entity';
import {InquiryFormListResponse} from "@/src/domains/inquiry-form/entity.ts";
import InquiryFormUsecase from "@/src/domains/inquiry-form/usecase.ts";
import InquiryFormFetcher from "@/src/modules/basebox/fetcher/fetcher.ts";

export default class InquiryFormUseCaseImpl implements InquiryFormUsecase {
  private fetcher: InquiryFormFetcher;

  constructor(fetcher: InquiryFormFetcher) {
    this.fetcher = fetcher;
  }

  async requestInquiryFormList(): Promise<HTTPResponse<InquiryFormListResponse>> {
    try {
      const response: HTTPResponse<InquiryFormListResponse> = await this.fetcher.requestInquiryFormList();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
