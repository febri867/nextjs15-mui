import { HTTPResponse } from '../core/entity';
import {
  InquiryFormListResponse
} from './entity';

export default interface InquiryFormUsecase {
  requestInquiryFormList: () => Promise<HTTPResponse<InquiryFormListResponse>>;
}
