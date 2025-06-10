import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
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

export const authAPI = {
  register: (data) => api.post("/user/register", data),
  login: (data) => api.post("/auth/login/", data), // You'll need to add this endpoint
};

export const postAPI = {
  getPosts: () => api.get("/Post/"),
  createPost: (data) => api.post("/Post/", data),
  deletePost: (id) => api.delete(`/posts/delete/${id}/`),
};

export default api;
