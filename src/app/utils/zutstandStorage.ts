import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

export const asyncZustandStorage: StateStorage = {
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, value);
  },
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value;
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};
