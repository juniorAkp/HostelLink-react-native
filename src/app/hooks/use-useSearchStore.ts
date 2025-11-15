// hooks/use-useSearchStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { asyncZustandStorage } from "../utils/zutstandStorage";

interface SearchStore {
  recentSearches: string[];
  searchQuery: string;
  addSearch: (term: string) => void;
  setSearchQuery: (q: string) => void;
  clearSearches: () => void;
}

const MAX_RECENT = 5;

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      searchQuery: "",

      setSearchQuery: (q) => set({ searchQuery: q }),

      addSearch: (term) => {
        const trimmed = term.trim();
        if (!trimmed) return;

        const current = get().recentSearches;
        const filtered = current.filter((t) => t !== trimmed);
        const updated = [trimmed, ...filtered].slice(0, MAX_RECENT);

        set({ recentSearches: updated, searchQuery: trimmed });
      },

      clearSearches: () => set({ recentSearches: [], searchQuery: "" }),
    }),
    {
      name: "search-storage",
      storage: createJSONStorage(() => asyncZustandStorage),
    }
  )
);
