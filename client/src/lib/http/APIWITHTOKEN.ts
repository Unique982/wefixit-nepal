import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔄 Dynamic Interceptor: Runs right before EVERY request hits the backend
APIWITHTOKEN.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        // Automatically inject the latest token from localStorage
        // Note: Added "Bearer " prefix if your backend authMiddleware expects it
        config.headers.Authorization = token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default APIWITHTOKEN;
