import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ParamsInterface {
  page: number;
  level: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  message: string | undefined;
  resourceId: string | undefined;
  traceId: string | undefined;
  spanId: string | undefined;
  commit: string | undefined;
  parentId: string | undefined;
}

const initialState: ParamsInterface = {
  page: 1,
  level: undefined,
  startDate: undefined,
  endDate: undefined,
  message: undefined,
  resourceId: undefined,
  traceId: undefined,
  spanId: undefined,
  commit: undefined,
  parentId: undefined,
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
