"use client";

import { Provider } from "react-redux";
import { store, RootState } from "@/components/redux/store";

const TableLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default TableLayout;
