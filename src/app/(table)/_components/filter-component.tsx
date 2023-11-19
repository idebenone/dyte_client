"use client";

import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
  ParamsInterface,
  setParams,
} from "@/components/redux/slices/querySlice";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { FilterIcon, XCircle } from "lucide-react";

import { CTA } from "./cta-component";
import { debounce } from "lodash";

export const Filters = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [filterType, setFilterType] = useState("message");
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [levelFilterActive, setLevelFilterActive] = useState(false);
  const [level, setLevel] = useState<string | undefined>();
  const [query, setQuery] = useState<ParamsInterface>({
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
  });

  const filterTypesMap = [
    { id: "message", name: "Message", icon: "" },
    { id: "resourceId", name: "Resource", icon: "" },
    { id: "traceId", name: "Trace", icon: "" },
    { id: "spanId", name: "Span", icon: "" },
    { id: "commit", name: "Commit", icon: "" },
    { id: "parentId", name: "Parent", icon: "" },
  ];

  const clearQuery = () => {
    const emptyQuery: ParamsInterface = {
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

    setQuery(emptyQuery);
    dispatch(setParams(emptyQuery));
    if (inputRef.current) inputRef.current.value = "";
    setFilterType("message");
  };

  const updateQuery = (newQuery: any) => {
    const updatedQuery = { ...query, ...newQuery };
    setQuery(updatedQuery);
    dispatch(setParams(updatedQuery));
  };

  const debouncedQueryUpdate = debounce(async (newQuery) => {
    const updatedQuery = { ...query, ...newQuery };
    setQuery(updatedQuery);
    dispatch(setParams(updatedQuery));
  }, 500);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const updatedQuery: any = {};
    value
      ? (updatedQuery[filterType] = value)
      : (updatedQuery[filterType] = undefined);
    // updateQuery(updatedQuery);
    debouncedQueryUpdate(updatedQuery);
  };

  const handleDateFilter = (event: boolean) => {
    setDateFilterActive(event);
    event
      ? updateQuery({ startDate: date?.from, endDate: date?.to })
      : updateQuery({ startDate: undefined, endDate: undefined });
  };

  const handleDateChange = (event: any) => {
    setDate(event);
    if (event && dateFilterActive)
      updateQuery({ startDate: event?.from, endDate: event?.to });
  };

  const handleLevelFilter = (event: boolean) => {
    setLevelFilterActive(event);
    if (event) {
      updateQuery({ level: level });
    } else {
      updateQuery({ level: undefined });
    }
  };

  const handleLevelChange = (event: string) => {
    if (event) {
      setLevel(event);
      if (levelFilterActive) updateQuery({ level: event });
    } else {
      updateQuery({ level: undefined });
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-2 w-2/3">
          <Input
            placeholder={`Query by type ` + filterType}
            name="searchText"
            onChange={handleSearch}
            ref={inputRef}
          />
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">
                Sort
                <FilterIcon className="h-3 w-3 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <Switch
                  checked={dateFilterActive}
                  onCheckedChange={handleDateFilter}
                />

                <div className={cn("grid gap-2")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Switch
                  checked={levelFilterActive}
                  onCheckedChange={handleLevelFilter}
                />

                <Select onValueChange={handleLevelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <CTA />
      </div>

      <div className="mt-2 flex gap-2 items-center">
        {filterTypesMap.map((val, ind) => (
          <p
            key={ind}
            className={cn(
              "cursor-pointer py-1 px-2 font-semibold border text-xs rounded-lg",
              filterType == val.id && "bg-none",
              filterType !== val.id && "bg-muted"
            )}
            onClick={() => {
              setFilterType(val.id);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            {val.name}
          </p>
        ))}

        <p
          className="flex items-center cursor-pointer py-1 px-2 font-semibold border bg-red-400 text-xs rounded-lg"
          onClick={clearQuery}
        >
          Reset
          <XCircle className="h-3 w-3 ml-1" />
        </p>
      </div>
    </div>
  );
};
