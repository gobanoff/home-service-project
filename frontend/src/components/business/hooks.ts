import { useQuery } from "@tanstack/react-query";
import { fetchBusinesses, fetchBusinessesCategory } from "./api";
export const BUSINESS_KEY = "BUSINESS";

interface UseBusinessesParams {
  page: number;
  limit: number;
}
export const useBusinesses = ({ page, limit }: UseBusinessesParams) => {
  return useQuery({
    queryKey: [BUSINESS_KEY, page, limit],
    queryFn: () => fetchBusinesses(page, limit),
  });
};
interface UseBusinessesCategoryParams {
  page: number;
  limit: number;
  categoryName?: string;
}
export const useBusinessesCategory = ({
  page,
  limit,
  categoryName,
}: UseBusinessesCategoryParams) => {
  return useQuery({
    queryKey: [BUSINESS_KEY, page, limit, categoryName],
    queryFn: () => fetchBusinessesCategory(page, limit, categoryName),
    enabled: !!categoryName,
  });
};
