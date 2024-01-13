// repositories/userRepository.js

import RxAPI from "../../api/rx/rx-api.js";

class RxRepository {
  async requestRxDownloadToken(data) {
    return RxAPI.requestRxDownloadToken(data);
  }

}

export default new RxRepository();
