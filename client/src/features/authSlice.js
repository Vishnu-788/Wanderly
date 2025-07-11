import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // save on login
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // clean up on logout
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
