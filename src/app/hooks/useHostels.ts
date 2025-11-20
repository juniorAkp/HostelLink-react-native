import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Hostels } from "../data/hostel";
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

export const useOwnerHostel = (ownerId: string) => {
  return useQuery({
    queryKey: ["hostel", "owner", ownerId],
    queryFn: () => hostelService.getOwnerListing(ownerId),
    enabled: !!ownerId,
  });
};

export const useSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["hostels", "search", searchTerm],
    queryFn: () => hostelService.search(searchTerm),
    enabled: typeof searchTerm === "string",
  });
};

export const useAddHostel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      hostelData,
      imageUris,
    }: {
      hostelData: Omit<Hostels, "id" | "images">;
      imageUris: string[];
    }) => {
      const imageUrls: string[] = [];

      if (imageUris && imageUris.length > 0) {
        for (let i = 0; i < imageUris.length; i++) {
          const uri = imageUris[i];
          const filename = `${Date.now()}_${hostelData.owner_id}_${i}.jpg`;
          const image_url = await hostelService.uploadHostelImage(
            uri,
            filename
          );
          imageUrls.push(image_url);
        }
      }

      const newHostel: Omit<Hostels, "id"> = {
        ...hostelData,
        images: imageUrls,
      };

      return hostelService.create(newHostel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hostels"] });
    },
  });
};
