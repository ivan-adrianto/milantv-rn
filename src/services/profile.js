import api from './apiServices';
import { API } from './urls';

// Get User Data
export async function getUser() {
  const res = await api.get(API.USERS);
  return res;
}

// Update Profile
export async function updateProfile(data) {
  const res = await api.put(API.USERS, data);
  return res;
}
