import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { Category } from "../category/types";
import { Business } from "../business/types";

interface VotingContextType {
  services: Business[];
  options: Category[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  increaseVote: (id: string) => void;
  increaseService: (id: string) => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [options, setOptions] = useState<Category[]>([]);
  const [services, setServices] = useState<Business[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const apiUrl = process.env.API_URL;
        const response = await axios.get(
          // "http://localhost:3000/categories"
          `${apiUrl}/categories`
        );
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.API_URL;
        const responses = await axios.get(
          //`http://localhost:3000/businesses/all?pageas=${currentPage}&limitas=${limit}`
          `${apiUrl}/businesses/all?pageas=${currentPage}&limitas=${limit}`
        );
        setTotalPages(responses.data.totalPages);
        setServices(responses.data.business);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchOptions();
    fetchServices();
  }, [currentPage]);

  const increaseVote = async (id: string) => {
    try {
      const apiUrl = process.env.API_URL;
      const response = await axios.post(
        // `http://localhost:3000/categories/${id}/vote`
        `${apiUrl}/categories/${id}/vote`
      );
      const updatedOption = response.data;
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option._id === id ? updatedOption : option
        )
      );
    } catch (error) {
      console.error("Error increasing vote:", error);
    }
  };

  const increaseService = async (id: string) => {
    try {
      const apiUrl = process.env.API_URL;
      const response = await axios.post(
        // `http://localhost:3000/businesses/${id}/rating`
        `${apiUrl}/businesses/${id}/rating`
      );
      const updatedService = response.data;
      setServices((prevService) =>
        prevService.map((service) =>
          service._id === id ? updatedService : service
        )
      );
    } catch (error) {
      console.error("Error increasing rating:", error);
    }
  };

  return (
    <VotingContext.Provider
      value={{
        options,
        services,
        totalPages,
        currentPage,
        increaseVote,
        increaseService,
        setCurrentPage,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
// eslint-disable-next-line
export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
};
