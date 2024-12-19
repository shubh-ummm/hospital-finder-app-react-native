import { createContext } from "react";

export const SelectMarkerContext = createContext({
  selectedMarkerIndex: null,
  setSelectedMarkerIndex: () => {},
});

export default SelectMarkerContext;
