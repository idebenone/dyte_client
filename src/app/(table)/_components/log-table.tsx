"use client";

import React, { useEffect, useState } from "react";
import { RootState } from "@/components/redux/store";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";

import { Filters } from "./filters";
import { TableComponent } from "./table";
import { Input } from "@/components/ui/input";
import { fetchLogs } from "@/components/api";

import { columns } from "./columns";
import { formatDate } from "@/components/utils";

export function LogTable() {
  const query = useSelector((state: RootState) => state.query);
  const [logs, setLogs] = useState([]);
  const [logsCount, setLogsCount] = useState<number>(0);

  const q =
    `page=${query.page} ` +
    `startDate=${query.startDate} ` +
    `endDate=${query.endDate} ` +
    `searchText=${query.searchText}`;

  const debouncedFetchData = debounce(async (queryParams) => {
    try {
      const fetchedData: any = await fetchLogs(queryParams);
      const modifiedData: any = fetchedData.logs.map((item: any) => ({
        ...item,
        parentId: item.metadata?.parentResourceId || "",
        timestamp: formatDate(item.timestamp),
      }));
      setLogs(modifiedData);
      setLogsCount(fetchedData.count);
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

  return (
    <div className="w-3/4">
      <Filters />
      <TableComponent columns={columns} data={logs} dataCount={logsCount} />

      <div className="mt-6">
        <p className="text-lg font-bold text-primary">QUERY STATE</p>
        <Input className="mt-2" value={q} disabled />
      </div>
    </div>
  );
}
