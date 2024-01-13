import { BASE_URL } from '../libs/constants.js';

class BaseAPI {
  constructor(endpoint) {
    this.baseUrl = BASE_URL;
    this.endpoint = endpoint;
  }

  async fetchWrapper(url, options) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
        if (data.message === 'Token expired.') {
          // Handle token expiration
          console.log('Token has expired');
          localStorage.removeItem('token');
          window.location.href ='/login';
          return null;
        } else if (data.message === 'Access denied. Invalid token.' || data.error === 'Invalid Token') {
          console.log(data.message || data.error);
          localStorage.removeItem('token');
          window.location.href ='/login';
          return null;
        }
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default BaseAPI;
