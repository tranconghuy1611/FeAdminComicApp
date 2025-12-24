import axiosClient from "./axiosClient";

export const getEmotions = () => {
  return axiosClient.get("/api/emotions");
};
