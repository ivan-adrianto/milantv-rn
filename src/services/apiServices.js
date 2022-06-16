import Axios from 'axios';
import { IP_ADDRESS } from '../../environment';

const api = Axios.create({
  baseURL: `http://${IP_ADDRESS}:3000/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export const addBearerToken = token => {
  api.defaults.headers = {
    Authorization: token,
  };
};
export const removeBearerToken = () => {
  delete api.defaults.headers.Authorization;
};

export default api;
