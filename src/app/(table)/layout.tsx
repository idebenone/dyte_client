"use client";

import { Provider } from "react-redux";
import { store } from "@/components/redux/store";
import { Toaster } from "@/components/ui/toaster";

const TableLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </div>
  );
};

export default TableLayout;
