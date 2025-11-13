import { AuthError } from "@supabase/supabase-js";
import z from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { profile as Profile } from "../data/profile";
import { supabase } from "../lib/supabase";
import { loginSchema, registerSchema } from "../utils/zodValidation";
import { asyncZustandStorage } from "../utils/zutstandStorage";

interface UserStore {
  user: Profile | null;
  isGuest: boolean;
  isLoading: boolean;
  errorMessage: string | null;
  zodErrors: string[] | null;

  setUser: (user: Profile | null) => void;
  setIsGuest: (isGuest: boolean) => void;
  clearError: () => void;

  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: (userId: string) => Promise<void>;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isGuest: false,
      isLoading: false,
      errorMessage: null,
      zodErrors: null,
      clearError: () => set({ errorMessage: null, zodErrors: null }),

      setUser: (user) => set({ user }),
      setIsGuest: (isGuest) => set({ isGuest }),

      login: async (email, password) => {
        set({ isLoading: true, errorMessage: null });
        const result = loginSchema.safeParse({ email: email.trim(), password });
        if (!result.success) {
          const tree = z.treeifyError(result.error);
          const msg = tree.properties?.email?.errors ||
            tree.properties?.password?.errors || ["Invalid email or password"];
          set({ zodErrors: msg, isLoading: false });
          return;
        }
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          if (!data.user) throw new Error("No user returned");

          set({
            user: data.user as unknown as Profile,
            isGuest: false,
            errorMessage: null,
          });
        } catch (err: any) {
          const msg = err instanceof AuthError ? err.message : "Login failed";
          set({ errorMessage: msg });
          throw err; // optional – lets component react if it wants
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email, username, password) => {
        const result = registerSchema.safeParse({
          email: email.trim(),
          username: username.trim(),
          password,
        });
        if (!result.success) {
          const tree = z.treeifyError(result.error);
          const msg = tree.properties?.email?.errors ||
            tree.properties?.password?.errors ||
            tree.properties?.username?.errors || [
              "Invalid email or password or username",
            ];
          set({ zodErrors: msg, isLoading: false });
          return;
        }

        set({ isLoading: true, errorMessage: null });
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } },
          });

          if (error) throw error;
          if (!data.user) throw new Error("No user returned after signup");

          const { error: profileError } = await supabase
            .from("profiles")
            .upsert(
              { id: data.user.id, username, email },
              { onConflict: "id" }
            );

          if (profileError) throw profileError;

          set({
            user: data.user as unknown as Profile,
            isGuest: false,
            errorMessage: null,
          });
        } catch (err: any) {
          const msg =
            err instanceof AuthError ? err.message : "Registration failed";
          set({ errorMessage: msg });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await supabase.auth.signOut();
          set({ user: null, isGuest: false, errorMessage: null });
        } catch (err: any) {
          set({ errorMessage: err.message ?? "Logout failed" });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAccount: async (userId: string) => {
        set({ isLoading: true });
        try {
          await supabase.from("profiles").delete().eq("id", userId);
          set({ user: null, isGuest: false, errorMessage: null });
        } catch (err: any) {
          set({ errorMessage: err.message ?? "Failed to delete account" });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => asyncZustandStorage),
    }
  )
);

export default useUserStore;
