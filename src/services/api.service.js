import axios from 'axios';
import { SessionService } from './session.service';

axios.defaults.baseURL = import.meta.env.VITE_CONNECT_API;
axios.defaults.headers.common['Authorization'] = `Bearer ${SessionService.getSession()}`;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export const ApiService = {
  get(resource) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${SessionService.getSession()}`;
    return axios.get(resource, { data: {} });
  },

  post(resource, params) {
    return axios.post(`${resource}`, params);
  },
  update(resource, params, id) {
    return axios.patch(`${resource}/${id}`, params);
  },
  patch(resource, params) {
    return axios.patch(`${resource}`, params);
  },
  delete(resource) {
    return axios.delete(resource);
  }
};
