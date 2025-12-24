// src/api/comicService.js (hoặc chapterService.js)

import axiosClient from "./axiosClient";

// === CHAPTER ===
export const getChaptersByStoryId = (storyId) => {
  return axiosClient.get("/api/chapters", { params: { storyId } });
};

export const getChapterById = (id) => {
  return axiosClient.get(`/api/chapters/${id}`);
};

export const createChapter = (data) => {
  return axiosClient.post("/api/chapters", data);
};

export const updateChapter = (id, data) => {
  return axiosClient.put(`/api/chapters/${id}`, data);
};

export const deleteChapter = (id) => {
  return axiosClient.delete(`/api/chapters/${id}`);
};