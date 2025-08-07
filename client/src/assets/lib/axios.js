import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:"https://fullstack-chat-app-3-y3ji.onrender.com/api",
  withCredentials: true,
});