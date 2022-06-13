import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://192.168.9.103:3000/",
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
