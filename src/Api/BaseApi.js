const BASE_URI = 'http://lookup-service-prod.mlb.com/json';

export default class BaseApi {
  endpoint = null;

  static stringWrap(str) {
    return `'${str}'`;
  }

  createQueryString(query, ignoreStringWrap = []) {
    const queryString = Object.keys(query).reduce((queryString, key) => {
      const shouldStringWrap = ignoreStringWrap.includes(key);

      const param = shouldStringWrap
        ? query[key]
        : BaseApi.stringWrap(query[key]);
      return queryString + `&${key}=${param}`;
    }, '');

    return queryString;
  }

  getURI(params, ignoreStringWrap = []) {
    return `${BASE_URI}/named.${this.endpoint}.bam?${this.createQueryString(
      params,
      ignoreStringWrap,
    )}`;
  }

  async getRequest(params, ignoreStringWrap = []) {
    const URI = this.getURI(params, ignoreStringWrap);

    const req = await fetch(URI);

    const response = await req.json();

    return response;
  }
}
