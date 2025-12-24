// src/api/taskService.js
import axiosClient from "./axiosClient";

// Lấy tất cả nhiệm vụ (admin)
export const getAllTasks = () => {
  return axiosClient.get("/api/tasks");
};

// Lấy nhiệm vụ của user hiện tại (nếu cần sau này)
// export const getMyTasks = () => {
//   return axiosClient.get("/api/tasks/my");
// };

// Tạo nhiệm vụ mới (admin)
export const createTask = (taskData) => {
  return axiosClient.post("/api/tasks", taskData);
};

// Cập nhật nhiệm vụ (admin)
export const updateTask = (id, taskData) => {
  return axiosClient.put(`/api/tasks/${id}`, taskData);
};

// Xóa nhiệm vụ (admin)
export const deleteTask = (id) => {
  return axiosClient.delete(`/api/tasks/${id}`);
};