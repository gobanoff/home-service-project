import axiosInstance from "@/config/axios";
import { Business } from "./types";

export const fetchBusinesses = async (): Promise<Business[]> => {
  const response = await axiosInstance.get("/api/businesses");
  return await response.data;
};