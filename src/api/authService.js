// src/api/authService.js
import axiosClient from './axiosClient';

export const loginAdmin = (data) => {
  return axiosClient.post('auth/login', data);
};
