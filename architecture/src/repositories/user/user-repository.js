// repositories/userRepository.js

import userAPI from '../../api/user/user-api.js';

class UserRepository {
  async createUser(data) {
    return userAPI.createUser(data);
  }

  async loginUser(data) {
    return userAPI.loginUser(data);
  }

}

export default new UserRepository();
