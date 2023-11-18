"use client";

import React, { useEffect, useState } from "react";
import { RootState } from "@/components/redux/store";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";

import { Filters } from "./filter-component";
import { TableComponent } from "./table-component";
import { Input } from "@/components/ui/input";
import { fetchLogs } from "@/components/api";

import { columns } from "./columns";
import { formatDate } from "@/components/utils";
import { setLogs } from "@/components/redux/slices/logSlice";
import { ConnectionStatus } from "@/app/_components/connection-status";

export function LogTable() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.query);
  const logState = useSelector((state: RootState) => state.logs);
  const [modifiedLogs, setModifiedLogs] = useState([]);

  const q1 =
    `page=${query.page} ` +
    `level=${query.level} ` +
    `startDate=${query.startDate} ` +
    `endDate=${query.endDate} ` +
    `message=${query.message}`;

  const q2 =
    `resourceId=${query.resourceId} ` +
    `traceId=${query.traceId} ` +
    `spanId=${query.spanId} ` +
    `commit=${query.commit} ` +
    `parentId=${query.parentId}`;

  const debouncedFetchData = debounce(async (queryParams) => {
    try {
      const fetchedData: any = await fetchLogs(queryParams);
      dispatch(setLogs(fetchedData));
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, 300);

  useEffect(() => {
    debouncedFetchData(query);
    return () => {
      debouncedFetchData.cancel();
    };
  }, [query]);

  useEffect(() => {
    const modifiedData: any = logState.logs.map((item) => ({
      ...item,
      parentId: item.metadata?.parentResourceId || "",
      timestamp: formatDate(item.timestamp),
    }));
    setModifiedLogs(modifiedData);
  }, [logState.logs]);

  return (
    <div className="p-4 w-full lg:w-3/4">
      <ConnectionStatus />
      <Filters />
      <TableComponent
        columns={columns}
        data={modifiedLogs}
        dataCount={logState.count}
      />

      <div className="mt-2">
        <p className="text-lg font-bold text-primary">QUERY STATE</p>
        <div className="border px-4 py-2 flex flex-col items-center text-sm font-normal text-green-700">
          <p>{q1}</p>
          <p>{q2}</p>
        </div>
      </div>
    </div>
  );
}
