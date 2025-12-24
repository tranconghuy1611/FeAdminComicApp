import axiosClient from "./axiosClient";

const API_URL = "/api/users";

// Lấy tất cả user
export const getAllUsers = () => {
  return axiosClient.get(API_URL);
};

// Lấy user theo ID
export const getUserById = (id) => {
  return axiosClient.get(`${API_URL}/${id}`);
};

// Update user
export const updateUser = (id, data) => {
  return axiosClient.put(`${API_URL}/${id}`, data);
};

// Xoá user
export const deleteUser = (id) => {
  return axiosClient.delete(`${API_URL}/${id}`);
};

// User hiện tại
export const getCurrentUser = () => {
  return axiosClient.get(`${API_URL}/me`);
};

// Điểm user hiện tại
export const getMyPoints = () => {
  return axiosClient.get(`${API_URL}/me/points`);
};
