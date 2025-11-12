import { Hostels } from "../data/hostel";
import { supabase } from "../lib/supabase";

export const hostelService = {
  //get all hostels available
  getAll: async (): Promise<Hostels[]> => {
    return (await supabase.from("listings").select()) as unknown as Hostels[];
  },
};
