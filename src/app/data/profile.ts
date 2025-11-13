export interface profile {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  phone_number: string;
  role: "admin" | "member";
}
