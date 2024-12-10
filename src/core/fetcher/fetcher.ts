import { createUrlParam } from './helper';

export class Fetcher {
  #id: string;

  #url: string;

  #queryParam: any;

  #data: any;

  _fetcher: any;

  #successHandler: any;

  #errorHandler: any;

  constructor() {
    this.#id = '';
    this.#url = '';
    this.#queryParam = {};
    this.#data = {};
    this._fetcher = null;
    this.#successHandler = (resp: any) => resp;
    this.#errorHandler = (err: any) => err;
  }

  // Getter & Setter
  setFetcher(fetcher: any) {
    this._fetcher = fetcher;
    return this;
  }

  setId(id: string) {
    this.#id = id;
    return this;
  }

  setUrl(url: string) {
    this.#url = url;
    return this;
  }

  setQueryParam(queryParam: any) {
    this.#queryParam = queryParam;
    return this;
  }

  setData(data: any) {
    this.#data = data;
    return this;
  }

  setSuccessHandler(successHandler: any) {
    this.#successHandler = successHandler;
    return this;
  }

  setErrorHandler(errorHandler: any) {
    this.#errorHandler = errorHandler;
    return this;
  }

  errorHandler(err) {
    try {
      return err.response.data;
    } catch (error) {
      throw error;
    }
  }

  // Main Function
  async post() {
    try {
      const response = await this._fetcher.post(
        createUrlParam(this.#url, this.#queryParam),
        this.#data,
      );
      return response;
    } catch (error) {
      const response = this.errorHandler(error);
      throw response;
    }
  }

  async put() {
    try {
      const response = await this._fetcher.put(
        createUrlParam(this.#url, this.#queryParam),
        this.#data,
      );
      return response;
    } catch (error) {
      const response = this.errorHandler(error);
      throw response;
    }
  }

  async get() {
    try {
      const response = await this._fetcher.get(createUrlParam(this.#url, this.#queryParam));
      return response;
    } catch (error) {
      const response = this.errorHandler(error);
      throw response;
    }
  }

  async getById() {
    const url = `${this.#url}/${this.#id}`;
    return this._fetcher
      .get(createUrlParam(url, this.#queryParam))
      .then((response: any) => this.#successHandler(response))
      .catch((err: any) => this.#errorHandler(err));
  }

  async putById() {
    const url = `${this.#url}/${this.#id}`;
    return this._fetcher
      .put(url, this.#data)
      .then((response: any) => this.#successHandler(response))
      .catch((err: any) => this.#errorHandler(err));
  }

  async patchById() {
    const url = `${this.#url}/${this.#id}`;
    return this._fetcher
      .patch(url, this.#data)
      .then((response: any) => this.#successHandler(response))
      .catch((err: any) => this.#errorHandler(err));
  }

  async delete() {
    try {
      const response = await this._fetcher.delete(
        createUrlParam(this.#url, this.#queryParam),
        this.#data,
      );
      return response;
    } catch (error) {
      const response = this.errorHandler(error);
      throw response;
    }
  }

  async deleteById() {
    const url = `${this.#url}/${this.#id}`;
    return this._fetcher
      .delete(createUrlParam(url, {}))
      .then((response: any) => this.#successHandler(response))
      .catch((err: any) => this.#errorHandler(err));
  }
}
