import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./slices/logSlice";
import querySlice from "./slices/querySlice";
export const store = configureStore({
  reducer: {
    logs: logSlice,
    query: querySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
