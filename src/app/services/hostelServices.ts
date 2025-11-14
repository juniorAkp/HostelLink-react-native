import { Hostels } from "../data/hostel";
import { supabase } from "../lib/supabase";

export const hostelService = {
  //get all hostels available
  getAll: async (): Promise<Hostels[]> => {
    const { data, error } = await supabase.from("listings").select("*");

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
    // Searches for hostels by name or amenities using case-insensitive LIKE queries.
    // Returns an array of Hostels that match either field.
    // If searchTerm is empty, return all hostels.
    if (!searchTerm.trim()) {
      const { data, error } = await supabase.from("listings").select("*");
      if (error) {
        console.log(error); //debug error
        return [];
      }

      return data as Hostels[];
    }

    // Perform a single query matching either the 'name' or 'amenities' fields.
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .or(`name.ilike.%${searchTerm}%,amenities.ilike.%${searchTerm}%`);

    if (error) {
      console.log(error); //debug error
      return [];
    }

    return data as Hostels[];
  },
};
