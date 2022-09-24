import { ApiService } from './api.service';

const URL = '/users';

const UsersService = {
  async getUsers() {
    return await ApiService.get(URL);
  }
};

export default UsersService;
