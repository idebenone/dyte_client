import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./slices/logSlice";
import querySlice from "./slices/querySlice";
import loadingSlice from "./slices/loadingSlice";
export const store = configureStore({
  reducer: {
    logs: logSlice,
    query: querySlice,
    load: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
