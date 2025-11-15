import { Hostels } from "../data/hostel";
import { supabase } from "../lib/supabase";

export const hostelService = {
  //get all hostels available
  getAll: async (country: string): Promise<Hostels[]> => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("country", country);

    if (error) {
      console.log(error); //debug error
      return [];
    }
    return data as Hostels[];
  },

  getById: async (hostelId: string): Promise<Hostels | null> => {
    //find hostel by id
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", hostelId)
      .single();
    if (error) {
      console.log(error); //debug error
      return null;
    }
    return data as Hostels;
  },

  search: async (searchTerm: string): Promise<Hostels[]> => {
    const term = searchTerm.trim();
    if (!term) return [];

    const { data, error } = await supabase.rpc("search_listings", {
      query_text: term,
    });

    if (error) throw error;

    return (data ?? []) as Hostels[];
  },
};
