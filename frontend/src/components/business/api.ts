import axiosInstance from "@/config/axios";
import { Business } from "./types";

export interface FetchBusinessesResponse {
  businesses: Business[];
  totalBusinesses: number;
  totalPages: number;
  currentPage: number;
}
export const fetchBusinesses = async (
  page: number,
  limit: number
): Promise<FetchBusinessesResponse> => {
  const response = await axiosInstance.get("/businesses", {
    params: { page, limit },
  });
  return await response.data;
};

export interface FetchBusinessesCategoryResponse {
  total: number;
  page: number;
  limit: number;
  businesses: Business[];
}
export const fetchBusinessesCategory = async (
  page: number,
  limit: number,
  categoryName?: string
): Promise<FetchBusinessesCategoryResponse> => {
  const response = await axiosInstance.get(
    `/businesses/category/${categoryName}`,
    {
      params: { page, limit, categoryName },
    }
  );
  return await response.data;
};
