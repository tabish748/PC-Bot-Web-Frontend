// api/userAPI.js

import BaseAPI from '../base-api.js';
import { ADD_DECEASED, DECEASED, UPDATE_DECEASED  } from '../data/endpoints/deceased-endpoints.js';

class deceasedAPI extends BaseAPI {
  constructor() 
  {
    super('/deceased');
  }

  async createDeceased(data) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${ADD_DECEASED}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  
  async getDeceasedById(id) 
  {
    console.log('idapiiii', id)
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${DECEASED}/${id}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    };
    return this.fetchWrapper(url, options);
  }

  
  
  async updateDeceasedById(id, data) 
  {
    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}${this.endpoint}${UPDATE_DECEASED}/${id}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
       body: JSON.stringify(data),
    };
    return this.fetchWrapper(url, options);
  }

  

  
}

export default new deceasedAPI();