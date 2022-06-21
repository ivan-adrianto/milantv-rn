import api from './apiServices';
import { API } from './urls';

// Get User Data
export async function getUser() {
  const res = await api.get(API.GET_USER_DATA);
  return res;
}
