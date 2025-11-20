export interface Hostels {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  phone_numbers: string[];
  exact_location: {
    lng: number;
    lat: number;
  };
  address: string;
  images: string[];
  type: string;
  website_url: string;
  email_addresses: string[];
  country: string;
  owner_id: string;
}
