"use client";

import { serverStatus } from "@/components/api";
import { useEffect, useState } from "react";

export const ConnectionStatus = () => {
  const [active, setActive] = useState(false);

  const checkStatus = async () => {
    const response = await serverStatus();
    if (response.status == 200) setActive(true);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="flex justify-start mb-4">
      {active ? (
        <div className="flex gap-2 items-center border px-2 py-1 rounded-md">
          <span className="h-3 w-3 bg-green-700 rounded-full"></span>
          <p className="text-muted-foreground text-sm font-medium mt-0.5">
            Connection established
          </p>
        </div>
      ) : (
        <div className="flex gap-2 items-center border px-2 py-1 rounded-md">
          <span className="h-3 w-3 bg-red-700 rounded-full"></span>
          <p className="text-muted-foreground text-sm font-medium mt-0.5">
            Connection lost
          </p>
        </div>
      )}
    </div>
  );
};
