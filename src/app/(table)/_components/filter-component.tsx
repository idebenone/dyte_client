"use client";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { setParams } from "@/components/redux/slices/querySlice";

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
import { FilterIcon } from "lucide-react";

import { CTA } from "./cta-component";

export const Filters = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [levelFilterActive, setLevelFilterActive] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    level: undefined,
    startDate: undefined,
    endDate: undefined,
    searchText: undefined,
  });

  const updateQuery = (newQuery: any) => {
    const updatedQuery = { ...query, ...newQuery };
    setQuery(updatedQuery);
    dispatch(setParams(updatedQuery));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value
      ? updateQuery({ searchText: event.target.value })
      : updateQuery({ searchText: undefined });
  };

  const handleDateFilter = (event: boolean) => {
    setDateFilterActive(event);
    event
      ? updateQuery({ startDate: date?.from, endDate: date?.to })
      : updateQuery({ startDate: undefined, endDate: undefined });
  };

  const handleDateChange = (event: any) => {
    setDate(event);
    handleDateFilter(true);
  };

  const handleLevelFilter = (event: boolean) => {
    setLevelFilterActive(event);
    event ? updateQuery({ level: "Error" }) : updateQuery({ level: undefined });
  };

  const handleLevelChange = () => {};

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-2 w-2/3">
          <Input
            placeholder="message, trace id, span id, commit..."
            name="searchText"
            onChange={handleSearch}
          />
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">
                Filter
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

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Success</SelectItem>
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
    </div>
  );
};
