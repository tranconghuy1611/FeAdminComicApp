import axiosClient from "./axiosClient";

// === STORY = COMIC ===
export const getAllComics = () => {
  return axiosClient.get("/api/stories");
};

export const getComicById = (id) => {
  return axiosClient.get(`/api/stories/${id}`);
};

export const createComic = (data) => {
  return axiosClient.post("/api/stories", data);
};

export const updateComic = (id, data) => {
  return axiosClient.put(`/api/stories/${id}`, data);
};

export const deleteComic = (id) => {
  return axiosClient.delete(`/api/stories/${id}`);
};
