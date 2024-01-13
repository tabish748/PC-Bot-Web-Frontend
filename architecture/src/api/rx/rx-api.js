// api/userAPI.js

import BaseAPI from '../base-api.js';
import { XPI_KEY } from '../../libs/constants.js';

import { REQUEST_RX_DOWNLOAD_TOKEN } from '../data/endpoints/rx-endpoints.js';
class RxAPI extends BaseAPI {
  constructor() {
    super('/Rx');
  }

  async requestRxDownloadToken(data) {
    const url = `${this.baseUrl}${this.endpoint}${REQUEST_RX_DOWNLOAD_TOKEN}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': XPI_KEY,
      
      },
      
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  

}

export default new RxAPI();

