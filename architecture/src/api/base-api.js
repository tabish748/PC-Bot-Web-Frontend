// api/baseAPI.js

import { BASE_URL } from '../libs/constants.js';

class BaseAPI {
  constructor(endpoint) {
    this.baseUrl = BASE_URL;
    this.endpoint = endpoint;
  }

  async fetchWrapper(url, options) {
    try {
      console.log('options:',options)
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default BaseAPI;
