import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducers,
    },
  });
};