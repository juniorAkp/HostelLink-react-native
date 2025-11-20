import type { Transaction } from "../data/transaction";
import { supabase } from "../lib/supabase";

export const transactionService = {
  createTransaction: async (transaction: Transaction): Promise<void> => {
    const { error } = await supabase.from("transactions").insert(transaction);
    if (error) throw error;
  },

  updateTransaction: async () => {},
};
