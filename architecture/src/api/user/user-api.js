// api/userAPI.js

import BaseAPI from '../base-api.js';
import { XPI_KEY } from '../../libs/constants.js';

import { USER_CREATE, USER_LOGIN } from '../data/endpoints/user-endpoints.js';
class UserAPI extends BaseAPI {
  constructor() {
    super('/User');
  }

  async createUser(data) {
    const url = `${this.baseUrl}${this.endpoint}${USER_CREATE}`;
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

  async loginUser(data) {
    const url = `${this.baseUrl}${this.endpoint}${USER_LOGIN}`;
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

  // Add more user-related API methods here
}

export default new UserAPI();

