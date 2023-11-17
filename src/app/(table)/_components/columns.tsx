"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Log = {
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: string;
};

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "resourceId",
    header: "Resource ID",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "message",
    header: "Message",
    maxSize: 200,
  },
  {
    accessorKey: "parentId",
    header: "Parent ID",
  },
  {
    accessorKey: "traceId",
    header: "Trace ID",
  },
  {
    accessorKey: "spanId",
    header: "Span ID",
  },
  {
    accessorKey: "commit",
    header: "Commit",
  },
];
