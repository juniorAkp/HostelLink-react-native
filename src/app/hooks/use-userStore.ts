import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { profile as Profile } from "../data/profile";
import zustandStorage from "../utils/zutstandStorage";

interface UserStore {
  user: Profile | null;
  isGuest: boolean;
  setUser: (user: Profile) => void;
  setIsGuest: (isGuest: boolean) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isGuest: false,
      user: null,
      setIsGuest: (isGuest: boolean) => set({ isGuest }),
      setUser: (user: Profile) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
