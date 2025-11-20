import { supabase } from "../lib/supabase";

export const userService = {
  upgradeProfile: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", id);
    if (error) throw error;
  },
};
