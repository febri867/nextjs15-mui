import axios, { AxiosRequestHeaders } from 'axios';

export default class Axios {
  #baseURL: string;

  #headers: AxiosRequestHeaders;

  #timeout: number;

  instance: any;

  constructor() {
    this.#baseURL = '';
    this.#headers = {
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
    };
    this.#timeout = 5000;
  }

  // Getter & Setter
  setBaseURL(baseUrl: string) {
    this.#baseURL = baseUrl;
  }

  setTimeout(timeout: number) {
    this.#timeout = timeout;
  }

  setHeaders(headers: AxiosRequestHeaders) {
    this.#headers = { ...this.#headers, ...headers };
    this.build();
  }

  // Builder
  build() {
    this.instance = axios.create({
      baseURL: this.#baseURL,
      headers: this.#headers,
      timeout: this.#timeout,
    });

    this.instance.interceptors.response.use(
      function (response: any) {
        if (response.data !== undefined) {
          return response.data;
        }
        return response;
      },
      function (error: any) {
        return Promise.reject(error);
      },
    );
  }

  // Request Processor
  // By default support post, get, put, delete & patch aliases to comply with class Fetcher
}
