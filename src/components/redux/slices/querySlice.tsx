import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParamsInterface {
  page: number;
  level: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  searchText: string | undefined;
}

const initialState: ParamsInterface = {
  page: 1,
  level: undefined,
  startDate: undefined,
  endDate: undefined,
  searchText: undefined,
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    getParams: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },

    setParams: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { getParams, setParams } = querySlice.actions;
export default querySlice.reducer;
