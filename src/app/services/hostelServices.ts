import { Hostels } from "../data/hostel";
import { supabase } from "../lib/supabase";

export const hostelService = {
  getAll: async (country: string): Promise<Hostels[]> => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("country", country);

    if (error) {
      console.log(error);
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
      console.log(error);
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

  //create
  create: async (hostel: Omit<Hostels, "id">): Promise<void> => {
    const { error } = await supabase.from("listings").insert(hostel);
    if (error) throw error;
  },

  //update
  update: async (id: string, hostel: Hostels): Promise<void> => {
    const { error } = await supabase
      .from("listings")
      .update(hostel)
      .eq("id", id);
    if (error) throw error;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) throw error;
  },

  getOwnerListing: async (ownerId: string): Promise<Hostels[]> => {
    const { data, error } = await supabase
      .from("listings")
      .select()
      .eq("owner_id", ownerId);
    if (error) throw error;
    return data as Hostels[];
  },

  //upload hostel image(s)
  uploadHostelImage: async (uri: string, filename: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from("listings")
      .upload(filename, blob, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("listings").getPublicUrl(data.path);

    return publicUrl;
  },
};
