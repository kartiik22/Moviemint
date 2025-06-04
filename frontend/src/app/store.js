import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";

// Configure Redux store with authentication slice
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
