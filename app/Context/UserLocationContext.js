import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <UserLocationContext.Provider
      value={{
        location,
        setLocation,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationContext;
