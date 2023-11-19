"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/components/redux/store";
import { setParams } from "@/components/redux/slices/querySlice";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataCount: number;
}

export function TableComponent<TData, TValue>({
  columns,
  data,
  dataCount,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.query);
  const loading = useSelector((state: RootState) => state.load);

  const [q, setQ] = useState({
    page: 1,
    startDate: undefined,
    endDate: undefined,
    searchText: undefined,
  });

  const updateQuery = (newQuery: any) => {
    const updatedQuery = { ...query, ...newQuery };
    setQ(updatedQuery);
    dispatch(setParams(updatedQuery));
  };

  const nextPage = () => {
    updateQuery({ page: query.page + 1 });
  };

  const prevPage = () => {
    if (query.page !== 1) updateQuery({ page: query.page - 1 });
  };

  const handleDisable = (): boolean => {
    const currentPageEndIndex = query.page * 10;
    return dataCount !== undefined && currentPageEndIndex >= dataCount;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: dataCount,
    state: {},
  });

  return (
    <div>
      <div className="rounded-md border mt-6">
        <ScrollArea className="h-[500px] px-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {!loading.loading && table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="w-[500px] p-1">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-full">
                  <TableCell
                    colSpan={columns.length}
                    className="h-[450px] text-center"
                  >
                    {loading.loading ? (
                      <div className="flex justify-center">
                        <div className="equalizer">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    ) : (
                      <p>No results.</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={query.page == 1}
        >
          Previous
        </Button>
        <p className="font-semibold text-sm text-muted-foreground">
          {query.page} / {dataCount}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={handleDisable()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
