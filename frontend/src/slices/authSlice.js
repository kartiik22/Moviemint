import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("token") || null },
  reducers: {
    login: (state, action) => {
      state.token = action.payload; // Save token in state
      localStorage.setItem("token", action.payload); // Save token in localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
