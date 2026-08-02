import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

// Ensure base URL always points to process.env.NEXT_PUBLIC_API_URL or default production Render URL
const getBaseUrl = (): string => {
  let url = process.env.NEXT_PUBLIC_API_URL || "https://internvision-portal.onrender.com/api/v1";
  // Strip trailing slash if present
  url = url.replace(/\/+$/, "");
  // Ensure base URL includes /api/v1
  if (!url.endsWith("/api/v1")) {
    url = `${url}/api/v1`;
  }
  return url;
};

export const API_BASE_URL = getBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30s timeout for Render cold starts
});

// Request Interceptor: Attach JWT Token if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Cold start retry & Global Auth Error Handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string; errors?: string[] }>) => {
    const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

    // Render Cold Start / Network failure retry logic (retry once after 2.5 seconds)
    if (config && (!error.response || error.code === "ECONNABORTED" || error.response.status >= 500)) {
      config._retryCount = config._retryCount || 0;
      if (config._retryCount < 1) {
        config._retryCount += 1;
        toast.loading("Backend is waking up (cold start)... Retrying...", { id: "cold-start-retry", duration: 4000 });
        await new Promise((resolve) => setTimeout(resolve, 2500));
        return api(config);
      }
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || "An unexpected error occurred.";

    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname.startsWith("/admin")) {
          toast.error("Session expired. Please log in again.");
          window.location.href = "/login";
        }
      }
    } else if (status === 403) {
      toast.error("Access forbidden. Admin authorization required.");
    }

    return Promise.reject(error);
  }
);
