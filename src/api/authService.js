// src/api/authService.js
import axiosClient from './axiosClient';

export const loginAdmin = (data) => {
  return axiosClient.post('auth/login', data);
};
export const getMe = () => {
  return axiosClient.get("api/users/me");
};