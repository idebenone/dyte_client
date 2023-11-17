import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogInterface {
  count: number;
  logs: any[];
}

const initialState: LogInterface = {
  count: 0,
  logs: [],
};

export const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    getLogs: (state, action: PayloadAction<any>) => {
      state = action.payload;
    },

    setLogs: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { getLogs, setLogs } = logSlice.actions;
export default logSlice.reducer;
