import axios from "axios";
//import { AuthContext } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});

const handleTokenRefresh = async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axiosInstance.post("/auth/token");
      return res.data.accessToken;
    } catch (err) {
      throw err;
    }
  }
  throw error;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const accessToken = await handleTokenRefresh(error);
      const originalRequest = error.config;
      originalRequest.headers["Authorization"] = "Bearer " + accessToken;
      return axiosInstance(originalRequest);
    } catch (err) {
      //const { dispatch } = AuthContext; // Access context directly
      //dispatch({ type: "LOGOUT" });
      return Promise.reject(err);
    }
  }
);

export default axiosInstance;
