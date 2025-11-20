import { AuthError } from "@supabase/supabase-js";
import z from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { profile as Profile } from "../data/profile";
import { supabase } from "../lib/supabase";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../utils/zodValidation";
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
  updateProfile: (
    userId: string,
    username: string,
    phone: string
  ) => Promise<void>;
  upgradeProfile: (id: string) => Promise<void>;
  getUser: (userId: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
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
      getUser: async (userId: string) => {
        set({ isLoading: true, errorMessage: null });
        try {
          const { data: userData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();
          if (profileError) throw profileError;
          set({
            user: userData as Profile,
            isGuest: false,
            errorMessage: null,
          });
        } catch (err: any) {
          const msg =
            err instanceof AuthError ? err.message : "Failed to fetch user";
          set({ errorMessage: msg });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

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
          get().getUser(data.user?.id!);
        } catch (err: any) {
          const msg = err instanceof AuthError ? err.message : "Login failed";
          set({ errorMessage: msg });
          throw err;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email, username, password) => {
        set({ isLoading: true, errorMessage: null });
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

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: username },
            },
          });

          if (error) throw error;
          get().getUser(data.user?.id!);
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

      updateProfile: async (
        userId: string,
        username: string,
        phone: string
      ) => {
        set({ isLoading: true, errorMessage: null });
        const result = updateProfileSchema.safeParse({
          phone: phone.trim(),
          username: username.trim(),
          userId,
        });
        if (!result.success) {
          const tree = z.treeifyError(result.error);
          const msg = tree.properties?.phone?.errors ||
            tree.properties?.username?.errors ||
            tree.properties?.userId?.errors || [
              "Invalid update details provided",
            ];
          set({ zodErrors: msg, isLoading: false });
          return;
        }
        try {
          const { error } = await supabase
            .from("profiles")
            .update({
              username: username,
              phone_number: phone,
            })
            .eq("id", userId);
          get().getUser(userId);
          if (error) throw error;
        } catch (error: any) {
          const msg =
            error instanceof AuthError ? error.message : "Update failed";
          set({ errorMessage: msg });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      upgradeProfile: async (id: string) => {
        set({ isLoading: true, errorMessage: null });
        try {
          const { error } = await supabase
            .from("profiles")
            .update({ role: "admin" })
            .eq("id", id);
          if (error) throw error;
          get().getUser(id);
        } catch (error: any) {
          const msg =
            error instanceof AuthError ? error.message : "Upgrade failed";
          set({ errorMessage: msg });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, errorMessage: null });
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "hostellink://(auth)/update-password",
          });
          if (error) throw error;
        } catch (error: any) {
          const msg =
            error instanceof AuthError
              ? error.message
              : "Failed to send password reset email";
          set({ errorMessage: msg });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updatePassword: async (newPassword: string) => {
        set({ isLoading: true, errorMessage: null });
        try {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (error) throw error;
        } catch (error: any) {
          const msg =
            error instanceof AuthError
              ? error.message
              : "Failed to update password";
          set({ errorMessage: msg });
          throw error;
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
