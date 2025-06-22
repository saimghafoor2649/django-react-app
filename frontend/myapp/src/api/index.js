import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust this to your backend URL
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postAPI = {
  getPosts: () => api.get("/posts/"),
  createPost: (data) => api.post("/posts/", data),
  deletePost: (id) => api.delete(`/posts/${id}/`),
};
export default api;
