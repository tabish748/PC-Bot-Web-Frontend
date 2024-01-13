
// repositories/userRepository.js

import deceasedApi from "../../api/deceased/deceased-api.js";

class deceasedRepository 
{
    
  async createDeceased(data) 
  {
    return deceasedApi.createDeceased(data);
  }
  
  async getDeceasedById(id) 
  {
    console.log('idrepo', id);
    return deceasedApi.getDeceasedById(id);
  }

  
  async updateDeceasedById(id, data) 
  {
    console.log('idrepo', id);
    return deceasedApi.updateDeceasedById(id, data);
  }

  
  
}

export default new deceasedRepository();