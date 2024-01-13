// api/userAPI.js

import BaseAPI from '../base-api.js';
import { CATEGORY_DATA  } from '../data/endpoints/category-endpoints.js';

class categoryAPI extends BaseAPI {
  constructor() 
  {
    super('/categories');
  }

  async getCategoryByType(type) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${CATEGORY_DATA}/${type}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };
    return this.fetchWrapper(url, options);
  }

  
}

export default new categoryAPI();

