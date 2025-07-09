import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../features/locationSlice";

export const useUserLocation = () => {
  const [location, setLocationState] = useState(null); // clearer name
  const [locationError, setLocationError] = useState(""); // clearer name
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedLocation = localStorage.getItem("userLocation");
    const cachedTimestamp = localStorage.getItem("userLocationTimestamp");
    const isCacheValid =
      cachedTimestamp && Date.now() - cachedTimestamp < 60 * 60 * 1000;

    const updateLocation = (coords) => {
      setLocationState(coords);
      dispatch(setLocation(coords));
      localStorage.setItem("userLocation", JSON.stringify(coords));
      localStorage.setItem("userLocationTimestamp", Date.now());
    };

    if (cachedLocation && isCacheValid) {
      updateLocation(JSON.parse(cachedLocation));
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          updateLocation(coords);
        },
        () => setLocationError("Failed to fetch location")
      );
    } else {
      setLocationError("Geolocation not supported");
    }
  }, [dispatch]);

  return { location, error: locationError };
};
