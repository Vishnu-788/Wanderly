import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import locationReducer from "../features/locationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
  },
});
