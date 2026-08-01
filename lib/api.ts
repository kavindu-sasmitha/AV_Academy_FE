import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear it and bounce to login
// (skip this on the login/register/google endpoints themselves — a bad
// password there should just show an error, not redirect)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes("/auth/login") ||
      error.config?.url?.includes("/auth/register") ||
      error.config?.url?.includes("/auth/google");

    if (error.response?.status === 401 && !isAuthEndpoint) {
      Cookies.remove("token");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
