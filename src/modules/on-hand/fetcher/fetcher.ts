import { Fetcher, FetcherHelper } from '@/src/core/fetcher';
import { HTTPResponse } from '@/src/domains/core/entity';
import {InquiryFormListResponse} from "@/src/domains/inquiry-form/entity.ts";

const { createAxios, clientErrorHandler, clientSuccessHandler } = FetcherHelper;

const baseApiUrl =  process.env.NEXT_PUBLIC_API_URL as string;

export default class InquiryFormFetcher extends Fetcher {
  constructor() {
    super();
    this.setUrl('');
    this.setQueryParam('');
    this.setData({});
    this.setSuccessHandler(clientSuccessHandler);
    this.setErrorHandler(clientErrorHandler);
  }

  setFetcherInstance(baseURL: string, headers: any, timeout: number = 30000) {
    const creation = {
      baseURL: baseURL,
      headers,
      timeout,
    };
    return this.setFetcher(createAxios(creation).instance);
  }

  async requestInquiryFormList() {
    // eslint-disable-next-line no-useless-catch
    try {
      this.setFetcherInstance(baseApiUrl, {});
      this.setUrl('admin/device');
      this.setQueryParam(null);
      const response: HTTPResponse<InquiryFormListResponse> = await this.get();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
