import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { profile as Profile } from "../data/profile";
import { supabase } from "../lib/supabase";
import { asyncZustandStorage } from "../utils/zutstandStorage";

interface UserStore {
  user: Profile | null;
  isGuest: boolean;
  setUser: (user: Profile) => void;
  setIsGuest: (isGuest: boolean) => void;
  login: (email: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
  deleteAccount: (userId: string) => Promise<void>;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isGuest: false,
      isLoading: false,
      user: null,
      setIsGuest: (isGuest: boolean) => set({ isGuest }),
      setUser: (user: Profile) => set({ user }),
      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) {
            throw error;
          }
          if (data?.user) {
            set({ user: data.user as unknown as Profile, isGuest: false });
            return data.user;
          }
          throw new Error("Invalid response from server");
        } catch (err) {
          throw err;
        }
      },
      register: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) {
            throw error;
          }
          if (data?.user) {
            set({ user: data.user as unknown as Profile, isGuest: false });
            return data.user;
          }
          throw new Error("Invalid response from server");
        } catch (err) {
          throw err;
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            throw error;
          }
          set({ user: null, isGuest: false });
        } catch (err) {
          throw err;
        }
      },
      deleteAccount: async (userId: string) => {
        try {
          await supabase.auth.signOut();
          supabase.from("profiles").delete().eq("id", userId);
          set({ user: null, isGuest: false });
        } catch (err) {
          set({ user: null, isGuest: false });
          throw err;
        }
      },
    }),

    {
      name: "user",
      storage: createJSONStorage(() => asyncZustandStorage),
    }
  )
);

export default useUserStore;
