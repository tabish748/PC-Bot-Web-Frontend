// repositories/userRepository.js

import userAPI from '../../api/user/user-api.js';

class UserRepository {
  async createUser(data) {
    return userAPI.createUser(data);
  }

  async loginUser(data) {
    return userAPI.loginUser(data);
  }
  async userList(page) {
    return userAPI.userList(page);
  }

  async getUserById(id) {
    return userAPI.getUserById(id);
  }

  async updateUser(id, data) {
    return userAPI.updateUser(id, data);
  }

  
  async getChildUsers(id) {
    return userAPI.getChildUsers(id);
  }

  
  async getUsersCountByGrant() {
    return userAPI.getUsersCountByGrant();
  }

  

  

}

export default new UserRepository();
