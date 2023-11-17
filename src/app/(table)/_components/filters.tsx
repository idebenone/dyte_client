"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { ChevronsRight, PlusCircleIcon, Sparkles } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useDispatch } from "react-redux";
import { setParams } from "@/components/redux/slices/querySlice";
import { ModeToggle } from "@/app/_components/mode-toggle";

export const Filters = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [dateFilActive, isDateFilActive] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
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
    updateQuery({ searchText: event.target.value });
  };

  const handleDateFilter = (event: boolean) => {
    isDateFilActive(event);
    if (event) {
      updateQuery({ startDate: date?.from, endDate: date?.to });
    } else {
      updateQuery({ startDate: undefined, endDate: undefined });
    }
  };

  const handleSlider = (event: any) => {
    setCount(event[0]);
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row gap-2 w-2/3">
          <Input
            placeholder="Type something..."
            name="searchText"
            onChange={handleSearch}
          />
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Filters</Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <div className="flex flex-row gap-3 items-center">
                <Switch
                  checked={dateFilActive}
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
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-row gap-2">
          <ModeToggle />

          <Button variant="outline" className="flex flex-row gap-2">
            Add
            <PlusCircleIcon className="w-4 h-4" />
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button className="flex flex-row gap-2">
                Generate
                <Sparkles className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-muted-foreground text-sm font-light p-3 border text-center">
                Max limit has been set to 10,00,000 logs.
              </p>
              <div className="flex flex-col gap-3 mt-3">
                <p className="text-base font-bold">Number of logs: {count}</p>
                <Slider
                  defaultValue={[count]}
                  max={1000000}
                  step={1000}
                  onValueChange={handleSlider}
                />
              </div>
              <div className="w-full flex justify-center mt-4">
                <Button>
                  Submit
                  <ChevronsRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
