import { create } from "zustand";

interface CreateHostelState {
  form: {
    name: string;
    type: string;
    country: string;
    address: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    amenities: string[];
    images: string[];
    location: {
      lat: number;
      lng: number;
    } | null;
  };
  setForm: (form: Partial<CreateHostelState["form"]>) => void;
  resetForm: () => void;
}

export const useCreateHostelStore = create<CreateHostelState>((set) => ({
  form: {
    name: "",
    type: "Hostel",
    country: "",
    address: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    amenities: [],
    images: [],
    location: null,
  },
  setForm: (updates) =>
    set((state) => ({ form: { ...state.form, ...updates } })),
  resetForm: () =>
    set({
      form: {
        name: "",
        type: "Hostel",
        country: "",
        address: "",
        description: "",
        website: "",
        email: "",
        phone: "",
        amenities: [],
        images: [],
        location: null,
      },
    }),
}));
