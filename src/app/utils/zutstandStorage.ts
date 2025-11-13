import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = createMMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

export default zustandStorage;

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
