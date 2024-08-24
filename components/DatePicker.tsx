"use client";

import * as React from "react";
import { format, startOfMonth, startOfYear, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(today),
    to: today,
  });
  const [selectValue, setSelectValue] = React.useState<string>("");

  const dateRanges: { [key: string]: DateRange } = {
    "0": {
      from: today,
      to: today,
    },
    "1": {
      from: subDays(today, 7),
      to: today,
    },
    "2": {
      from: subDays(today, 30),
      to: today,
    },
    "3": {
      from: startOfMonth(today),
      to: today,
    },
    "4": {
      from: startOfYear(today),
      to: today,
    },
  };

  const handleSelectChange = (value: string) => {
    const selectedRange = dateRanges[value];
    if (selectedRange) {
      setDate(selectedRange);
      setSelectValue(value);
    }
  };

  const handleCalendarSelect = (selectedDateRange: DateRange | undefined) => {
    setDate(selectedDateRange);
    setSelectValue("");
  };

  React.useEffect(() => {
    setSelectValue("3");
  }, []);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger>
          <div className="flex flex-row">
            <Button
              id="date"
              variant={"outline"}
              className={cn("date-button", !date && "text-muted-foreground ")}
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
                <span className="text-black">Pick a date</span>
              )}
            </Button>
            <Select value={selectValue} onValueChange={handleSelectChange}>
              <SelectTrigger className="select-button">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-white" position="popper">
                <SelectItem value="0" className="date-select">
                  Today
                </SelectItem>
                <SelectItem value="1" className="date-select">
                  Last 7 days
                </SelectItem>
                <SelectItem value="2" className="date-select">
                  Last 30 days
                </SelectItem>
                <SelectItem value="3" className="date-select">
                  Month to Date
                </SelectItem>
                <SelectItem value="4" className="date-select">
                  Year to Date
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleCalendarSelect} // Use handleCalendarSelect method
            numberOfMonths={2}
            disabled={(date) => date > today}
            classNames={{
              day_selected: "bg-blue-500 text-white rounded-lg",
              day_range_middle: "bg-blue-200 rounded-sm",
              day_disabled: "text-gray-500",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
