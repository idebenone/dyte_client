import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingInterface {
  loading: boolean;
}

const initialState: LoadingInterface = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setState } = loadingSlice.actions;
export default loadingSlice.reducer;
