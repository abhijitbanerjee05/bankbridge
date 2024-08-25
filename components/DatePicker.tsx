"use client";

import * as React from "react";
import { addDays, format, startOfMonth, startOfYear, subDays } from "date-fns";
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

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (date: DateRange | undefined) => void;
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const todayEnd = new Date();
  const todayStart = new Date();
  todayEnd.setHours(23, 59, 59, 59);
  todayStart.setHours(0, 0, 0, 0);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(todayEnd),
    to: todayEnd,
  });
  const [selectValue, setSelectValue] = React.useState<string>("");

  const dateRanges: { [key: string]: DateRange } = {
    "0": {
      from: todayStart,
      to: todayEnd,
    },
    "1": {
      from: subDays(todayStart, 7),
      to: todayEnd,
    },
    "2": {
      from: subDays(todayStart, 30),
      to: todayEnd,
    },
    "3": {
      from: startOfMonth(todayStart),
      to: todayEnd,
    },
    "4": {
      from: startOfYear(todayStart),
      to: todayEnd,
    },
  };

  const handleSelectChange = (value: string) => {
    const selectedRange = dateRanges[value];
    if (selectedRange) {
      setDate(selectedRange);
      setSelectValue(value);
      onDateChange(selectedRange); // Send date range to parent
    }
  };

  const handleCalendarSelect = (selectedDateRange: DateRange | undefined) => {
    if (selectedDateRange && selectedDateRange.to) {
      const endOfDay = new Date(selectedDateRange.to.getTime());
      endOfDay.setHours(23, 59, 59, 999);

      // Create a new date range with the updated 'to' date
      const updatedDateRange: DateRange = {
        from: selectedDateRange.from,
        to: endOfDay,
      };

      // Update state and notify parent
      setDate(updatedDateRange);
      setSelectValue("");
      onDateChange(updatedDateRange);
    } else {
      // Handle the case where selectedDateRange is undefined
      setDate(undefined);
      setSelectValue("");
      onDateChange(undefined);
    }
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
            onSelect={handleCalendarSelect}
            numberOfMonths={2}
            disabled={(date) => date > todayEnd}
            classNames={{
              day_selected: "bg-blue-500 text-white rounded-sm",
              day_range_middle: "bg-blue-300 rounded-sm",
              day_disabled: "text-gray-500",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
