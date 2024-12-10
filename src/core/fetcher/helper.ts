import Axios from './lib/axios';

const createAxios = ({ baseURL, headers, timeout }) => {
  const axios = new Axios();
  axios.setBaseURL(baseURL);
  if (headers) {
    axios.setHeaders(headers);
  }
  if (timeout) {
    axios.setTimeout(timeout);
  }
  axios.build();

  return axios;
};

const clientSuccessHandler = (response: any) => {
  return response;
};

const clientErrorHandler = (error: any) => {
  return error;
};

const createUrlParam = (url: string, queryObj: any) => {
  if (url && queryObj) {
    const encode: any = (obj: any, nesting = '') => {
      const pairs = Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object') {
          return encode(value, `${nesting}${encodeURIComponent(key)}=`);
        }
        return [nesting + encodeURIComponent(key), encodeURIComponent(`${value}`)].join('=');
      });

      return pairs.join('&');
    };

    const query = encode(queryObj);
    if (url.includes('?')) {
      return `${url}&${query}`;
    }
    return `${url}?${query}`;
  }

  return url;
};

const errorTransformer = (error: any) => {
  const err = error.toJSON();
  if (err.message === 'Request failed with status code 502') {
    return {
      status: '502',
      message: 'bad gateway',
    };
  }

  return err;
};

const successTransformer = (response: any) => {
  if (response.status === '200') {
    return {
      status: '502',
      message: 'bad gateway',
    };
  }

  return response;
};

export {
  successTransformer,
  errorTransformer,
  createUrlParam,
  clientErrorHandler,
  clientSuccessHandler,
  createAxios,
};
