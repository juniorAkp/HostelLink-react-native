export interface Transaction {
  id?: string;
  user_id: string;
  reference: string;
  status: string;
  amount: number;
}
