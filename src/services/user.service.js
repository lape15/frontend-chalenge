import { ApiService } from './api.service';

const URL = '/user';

const UserService = {
  async getUser() {
    return await ApiService.get(URL);
  }
};

export default UserService;
