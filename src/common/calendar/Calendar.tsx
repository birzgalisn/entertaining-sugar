import { useMemo, useState } from "react";
import cn from "classnames";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isToday,
  isWithinInterval,
  parse,
  startOfToday,
} from "date-fns";
import RadixPopover, { IRadixPopover } from "../radix/popover/RadixPopover";
import dropdown from "@/assets/dropdown.svg";
import calendar from "@/assets/calendar.svg";
import "./Calendar.scss";

interface ICalendar extends Omit<IRadixPopover, "trigger"> {
  label: string;
  from?: string;
  till?: string;
  setTime: (value?: Date) => void;
}

const Calendar: React.FC<ICalendar> = ({
  label,
  from,
  till,
  setTime,
  ...props
}) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = useMemo<Date>(
    () => parse(currentMonth, "MMM-yyyy", new Date()),
    [currentMonth]
  );
  const days = useMemo<Array<Date>>(
    () =>
      eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
      }),
    [firstDayCurrentMonth]
  );
  const showPickedDate = useMemo(
    () =>
      selectedDay
        ? isToday(selectedDay)
          ? "Today"
          : format(selectedDay, "dd.MM.yyyy")
        : "dd.mm.yyyy",
    [selectedDay]
  );
  const dayFrom = useMemo<Date | undefined>(
    () => (!!from ? new Date(from) : undefined),
    [from]
  );
  const dayTill = useMemo<Date | undefined>(
    () => (!!till ? new Date(till) : undefined),
    [till]
  );

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const chooseDay = (day: Date) => {
    const unselect = selectedDay && isEqual(day, selectedDay);
    const value = unselect ? undefined : day;
    setSelectedDay(value);
    setTime(value);
  };

  return (
    <div className="mp-calendar">
      <p className="mp-calendar-label">{label}</p>
      <RadixPopover
        trigger={
          <div className="mp-calendar-input-wrapper">
            <p className="mp-calendar-input">{showPickedDate}</p>
            <div className="mp-calendar-icon-wrapper">
              <img src={calendar} alt="Calendar icon" />
            </div>
          </div>
        }
        {...props}
      >
        <div className="mp-calendar-popover">
          <h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
          <button onClick={previousMonth}>
            <img src={dropdown} alt="Previous month" />
          </button>
          <button onClick={nextMonth}>
            <img src={dropdown} alt="Next month" />
          </button>
        </div>
        <div className="mp-calendar-popover-dow">
          <p>M</p>
          <p>T</p>
          <p>W</p>
          <p>T</p>
          <p>F</p>
          <p>S</p>
          <p>S</p>
        </div>
        <div className="mp-calendar-popover-grid">
          {days.map((day, dayIdx) => (
            <button
              key={day.toString()}
              disabled={
                isFuture(day) ||
                (!!dayFrom && isBefore(day, dayFrom)) ||
                (!!dayFrom && isAfter(day, add(dayFrom, { days: 31 }))) ||
                (!!dayTill && isBefore(day, add(dayTill, { days: -31 }))) ||
                (!!dayTill && isAfter(day, dayTill))
              }
              onClick={() => chooseDay(day)}
              className={cn(
                {
                  "mp-calendar-popover-grid-day-current": isToday(day),
                  "mp-calendar-popover-grid-day-selected":
                    (!!dayFrom && isEqual(day, dayFrom)) ||
                    (!!dayTill && isEqual(day, dayTill)),
                  "mp-calendar-popover-grid-day-between":
                    !!dayFrom &&
                    !!dayTill &&
                    isWithinInterval(day, { start: dayFrom, end: dayTill }),
                },
                dayIdx === 0 && monthStartOn[getDay(day)],
                "mp-calendar-popover-grid-day"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          ))}
        </div>
      </RadixPopover>
    </div>
  );
};

const monthStartOn = [
  "mp-calendar-popover-grid-day-7",
  "mp-calendar-popover-grid-day-1",
  "mp-calendar-popover-grid-day-2",
  "mp-calendar-popover-grid-day-3",
  "mp-calendar-popover-grid-day-4",
  "mp-calendar-popover-grid-day-5",
  "mp-calendar-popover-grid-day-6",
];

export default Calendar;
