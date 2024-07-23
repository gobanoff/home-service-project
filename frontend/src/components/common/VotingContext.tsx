import React, { createContext, useContext, useState, ReactNode } from "react";

interface Option {
  name: string;
  votes: number;
}
interface Service {
  name: string;
  votes: number;
}

interface VotingContextType {
  service: Service[];
  options: Option[];
  increaseVote: (index: number) => void;
  increaseService: (index: number) => void;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [options, setOptions] = useState<Option[]>([
    { name: "Cleaning", votes: 0 },
    { name: "Painting", votes: 0 },
    { name: "Electric", votes: 0 },
    { name: "Shifting", votes: 0 },
    { name: "Plumbing", votes: 0 },
    { name: "Repair", votes: 0 },
  ]);
  const [service, setService] = useState<Service[]>([
    { name: "UAB Valymas", votes: 0 },
    { name: "Išsivalyk pats", votes: 0 },
    { name: "Moki veži", votes: 0 },
    { name: "Elektrikas į namus", votes: 0 },
    { name: 'UAB "Dažytoja į namus"', votes: 0 },
    { name: "Santechnikos darbai", votes: 0 },
  ]);
  const increaseVote = (index: number) => {
    const newOptions = [...options];
    newOptions[index].votes += 1;
    setOptions(newOptions);
  };
  const increaseService = (index: number) => {
    const newServices = [...service];
    newServices[index].votes += 1;
    setService(newServices);
  };

  return (
    <VotingContext.Provider
      value={{ options, service, increaseVote, increaseService }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
};
