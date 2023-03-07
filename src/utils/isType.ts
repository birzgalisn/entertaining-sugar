import { TVehicleRoute } from "@/types";

export const isString = (text: unknown): text is string => {
  if (!(text as string).trim().length) {
    return false;
  }
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (value: unknown): value is number => {
  return !Number.isNaN(Number(value as any));
};

export const isArray = (arr: unknown): arr is Array<any> => {
  return typeof arr === "object" && arr instanceof Array;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isVehicleRouteType = (
  type: unknown
): type is TVehicleRoute["type"] => {
  switch (type as TVehicleRoute["type"]) {
    case "route":
    case "stop":
      return true;
    default:
      return false;
  }
};
