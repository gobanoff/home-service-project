import { PROD } from "@/consts/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
  ? "https://data.mongodb-api.com/app/data-doqcyro/endpoint/data/v1/"
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
