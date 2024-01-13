// repositories/userRepository.js

import categoryApi from "../../api/category/category-api.js";

class categoryRepository 
{
  async getCategoryByType(type) 
  {
    return categoryApi.getCategoryByType(type);
  }

  
}

export default new categoryRepository();
