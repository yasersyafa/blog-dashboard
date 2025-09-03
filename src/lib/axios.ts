import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_API_URL ??
    "https://blog-app-backend-three-dusky.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000, // 15 seconds
});

export default axiosInstance;
