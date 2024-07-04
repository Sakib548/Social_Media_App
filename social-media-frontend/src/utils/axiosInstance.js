// src/utils/axiosInstance.js
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { dispatch } = useContext(AuthContext);
      try {
        const res = await axiosInstance.post("/auth/token");
        dispatch({
          type: "REFRESH_TOKEN_SUCCESS",
          payload: res.data.accessToken,
        });
        originalRequest.headers["Authorization"] =
          "Bearer " + res.data.accessToken;
        return axiosInstance(originalRequest);
      } catch (err) {
        dispatch({ type: "LOGOUT" });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
