import { createContext, useContext, useState } from "react";

const context = createContext();

export default function StoreProvider({ children }) {
  const [locationPicker, setLocationPicker] = useState(false);
  const [location, setLocation] = useState(false);

  const value = { locationPicker, setLocationPicker, location, setLocation };
  return <context.Provider value={value}>{children}</context.Provider>;
}

export function useStore() {
  return useContext(context);
}
