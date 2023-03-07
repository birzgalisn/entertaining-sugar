import { TVehicleRoute } from "@/types";
import { differenceInSeconds, hoursToMinutes } from "date-fns";

export const calculateSecondsSpent = (route: TVehicleRoute): number =>
  differenceInSeconds(new Date(route.end.time), new Date(route.start.time));

export const formatSecondsSpent = (seconds: number): string => {
  const hours = seconds / 3600;
  const [fullHours] = hours.toString().split(".");
  const minutes = hoursToMinutes(hours - Number(fullHours));
  return `${fullHours}h ${minutes}m`;
};
