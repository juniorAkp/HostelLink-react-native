export interface Hostels {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  phoneNumbers: string[];
  exact_location: {
    lng: number;
    lat: number;
  };
  address: string;
  images: string[];
  type: string;
  country: string;
}
