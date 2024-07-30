import { PROD } from "@/consts/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
  ? "https://home-service-project-alex-lhgxe1pch-alexs-projects-fafa6a1d.vercel.app/"
  : "http://localhost:3000/";

const config: AxiosRequestConfig = {
  baseURL,
};

export const axiosInstance = axios.create(config); // sukuriamas naujas instance su configu

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // istraukiamas tokenas

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`; // pridedam Bearer tokena i headersus
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
