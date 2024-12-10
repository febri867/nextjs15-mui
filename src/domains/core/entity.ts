export interface Route {
  path: string;
  key: string;
  component: any;
}

export interface HTTPResponse<D> {
  message?: string;
  data?: D;
  error_code?: number | string;
  error_message?: string;
  error_status?: number;
  attributes?: {
    field?: string;
    message?: string;
  }[];
}
