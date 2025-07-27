// client/lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // backend base
  withCredentials: true, // allow cookie
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        Cookies.set("accessToken", data.accessToken);
        err.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(err.config);
      } catch (refreshErr) {
        Cookies.remove("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
