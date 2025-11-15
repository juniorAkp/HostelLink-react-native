import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { hostelService } from "../services/hostelServices";

interface FavouriteState {
  favouriteHostelIds: string[];
  addFavourite: (hostelId: string) => void;
  removeFavourite: (hostelId: string) => void;
  setFavourites: (ids: string[]) => void;
  isInitialised: boolean;
  setInitialised: (v: boolean) => void;
}

export const useFavouriteStore = create<FavouriteState>()((set, get) => ({
  favouriteHostelIds: [],
  addFavourite: (hostelId) => {
    const current = get().favouriteHostelIds;
    if (!current.includes(hostelId)) {
      set({ favouriteHostelIds: [...current, hostelId] });
    }
  },
  removeFavourite: (hostelId) => {
    set({
      favouriteHostelIds: get().favouriteHostelIds.filter(
        (id) => id !== hostelId
      ),
    });
  },
  setFavourites: (ids) => set({ favouriteHostelIds: ids }),
  isInitialised: false,
  setInitialised: (v) => set({ isInitialised: v }),
}));

// Fetch a single hostel by its id
export const useFavouriteHostel = (hostelId: string | null) => {
  return useQuery({
    queryKey: ["hostel", hostelId],
    queryFn: async () => {
      if (!hostelId) return null;
      return hostelService.getById(hostelId);
    },
    enabled: !!hostelId,
  });
};

// Fetch all favourite hostels from supabase using ids stored in zustand
export const useFavouriteHostels = () => {
  const { favouriteHostelIds } = useFavouriteStore();
  return useQuery({
    queryKey: ["favouriteHostels", favouriteHostelIds],
    queryFn: async () => {
      if (!favouriteHostelIds.length) return [];
      // The hostelService.getById may need to be adjusted to accept array input for batch fetch,
      // otherwise fall back to Promise.all
      const hostels = await Promise.all(
        favouriteHostelIds.map((id) => hostelService.getById(id))
      );
      return hostels.filter(Boolean);
    },
    enabled: favouriteHostelIds.length > 0,
  });
};

// Utility hooks for adding/removing favourites
export const useSetFavourite = () => {
  const addFavourite = useFavouriteStore((s) => s.addFavourite);
  const removeFavourite = useFavouriteStore((s) => s.removeFavourite);

  return {
    addFavourite,
    removeFavourite,
  };
};
