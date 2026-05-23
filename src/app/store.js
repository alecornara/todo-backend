import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "../features/goalsSlice";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
});