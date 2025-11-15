import { useQuery } from "@tanstack/react-query";
import { hostelService } from "../services/hostelServices";

export const useHostels = (country: string) => {
  return useQuery({
    queryKey: ["hostels"],
    queryFn: async () => {
      return hostelService.getAll(country);
    },
  });
};

export const useHostel = (hostelId: string) => {
  return useQuery({
    queryKey: ["hostel", hostelId],
    queryFn: () => hostelService.getById(hostelId),
    enabled: !!hostelId,
  });
};

export const useSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["hostels", "search", searchTerm],
    queryFn: () => hostelService.search(searchTerm),
    enabled: typeof searchTerm === "string",
  });
};
