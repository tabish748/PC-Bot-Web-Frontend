
  // api/userAPI.js

import BaseAPI from '../base-api.js';
import { XPI_KEY } from '../../libs/constants.js';
import { FIND_SEARCH_TERM_SUGGESTIONS, FIND_DRUG_PRICES_BY_ZIP } from '../data/endpoints/pharmacy-endpoints.js';

class PharmacyAPI extends BaseAPI {
  constructor() 
  {
    super('/Pharmacy');
  }

  async findSearchTermSuggestions(data) {
    const url = `${this.baseUrl}${this.endpoint}${FIND_SEARCH_TERM_SUGGESTIONS}`;
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
  async findDrugPricesByZip(data) {
    const url = `${this.baseUrl}${this.endpoint}${FIND_DRUG_PRICES_BY_ZIP}`;
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

export default new PharmacyAPI();

