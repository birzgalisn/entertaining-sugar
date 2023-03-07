import { IVehicle } from "@/types";
import { isNumber, isString } from "./isType";

export const parseUnitId = (id: unknown): number => {
  if (!id || !isNumber(id)) {
    throw new Error("Incorrect or missing unit_id: " + id);
  }
  return id;
};

const parseNumber = (number: unknown): string => {
  if (!number || !isString(number)) {
    throw new Error("Incorrect or missing number: " + number);
  }
  return number;
};

export const toNewVehicle = (vehicle: any): IVehicle => {
  const newVehicle: IVehicle = {
    unit_id: parseUnitId(vehicle.unit_id),
    number: parseNumber(vehicle.number),
  };
  return newVehicle;
};
