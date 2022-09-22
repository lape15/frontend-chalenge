import { ApiService } from './api.service';

const URL = '/signup';

const AuthService = {
  async createNewUser(data) {
    return await ApiService.post(URL, data);
  },
  async signInUser(data) {
    return await ApiService.post('/login', data);
  }
};

export default AuthService;
