"use client";

import { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { generateLogs } from "@/components/api";
import { ModeToggle } from "@/app/_components/mode-toggle";

import { CheckCircle, ChevronsRight, Sparkles } from "lucide-react";
import { LogForm } from "./log-form";

export const CTA = () => {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isCounterRunning, setIsCounterRunning] = useState(false);
  const [apiFinished, setApiFinished] = useState(false);

  const handleSlider = (event: any) => {
    setCount(event[0]);
  };

  const mockApiCall = async () => {
    setIsCounterRunning(true);
    const response = await generateLogs(count);
    setApiFinished(true);
    setIsCounterRunning(false);
  };

  useEffect(() => {
    let intervalId: any;
    if (isCounterRunning) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setTimeout(() => {
        if (apiFinished) {
          setApiFinished(false);
        }
        setCounter(0);
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isCounterRunning]);

  return (
    <div className="flex flex-row gap-2">
      <ModeToggle />

      <LogForm />

      <Popover>
        <PopoverTrigger>
          <Button className="flex flex-row gap-2">
            Generate
            <Sparkles className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-muted-foreground text-sm font-light p-3 border text-center">
            Max limit has been set to 1,00,000 logs.
          </p>
          <div className="flex flex-col gap-3 mt-3">
            <p className="text-base font-bold">Number of logs: {count}</p>
            <Slider
              defaultValue={[count]}
              max={100000}
              step={1000}
              onValueChange={handleSlider}
            />
          </div>
          <div className="w-full flex flex-col justify-center mt-4">
            <Button onClick={mockApiCall}>
              {isCounterRunning ? (
                <div className="w-20">{counter} sec</div>
              ) : (
                <div className="w-20 flex justify-center items-center">
                  {apiFinished ? (
                    <div className="text-green-600 flex justify-center items-center">
                      Done
                      <CheckCircle className="text-green-600 ml-2 h-4 w-4" />
                    </div>
                  ) : (
                    <>
                      Submit
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </div>
              )}
            </Button>

            {!isCounterRunning && counter > 0 && (
              <p className="text-center mt-2 text-muted-foreground text-sm">
                Finished in {counter} seconds
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
