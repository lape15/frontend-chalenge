import { ApiService } from './api.service';

const URL = '/user';

const AuthService = {
  //To generate chanllenge QR code
  async createNewUser(data) {
    return await ApiService.post(URL, data);
  }
};

export default AuthService;
