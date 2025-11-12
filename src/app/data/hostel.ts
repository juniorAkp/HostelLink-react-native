export interface Hostels {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  phoneNumbers: string[];
  location: {
    longitude: number;
    latittude: number;
  };
  address: string;
  image_urls: string[];
  type: string;
  country: string;
}
