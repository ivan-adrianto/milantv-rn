import api from './apiServices';
import {API} from './urls';

// Register
export async function register(data) {
  const res = await api.post(API.REGISTER, data);
  return res;
}

// Login
export async function login(data) {
  const res = await api.post(API.LOGIN, data);
  return res;
}