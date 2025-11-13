import { useQuery } from "@tanstack/react-query";
import { hostelService } from "../services/hostelServices";

export const useHostels = () => {
  return useQuery({
    queryKey: ["hostels"],
    queryFn: async () => {
      return hostelService.getAll();
    },
  });
};
