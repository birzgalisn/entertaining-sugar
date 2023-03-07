import { IVehicleRoutePin } from "@/types";
import { isNumber, isString } from "./isType";

export const parsePinTime = (time: unknown): string => {
  if (!time || !isString(time)) {
    throw new Error("Incorrect or missing route pin time: " + time);
  }
  return time;
};

const parsePinAddress = (address: unknown): string => {
  if (!address || !isString(address)) {
    throw new Error("Incorrect or missing route pin address: " + address);
  }
  return address;
};

const parsePinLat = (lat: unknown): number => {
  if (!lat || !isNumber(lat)) {
    throw new Error("Incorrect or missing route pin lat: " + lat);
  }
  return lat;
};

const parsePinLng = (lng: unknown): number => {
  if (!lng || !isNumber(lng)) {
    throw new Error("Incorrect or missing route pin lng: " + lng);
  }
  return lng;
};

export const toNewVehicleRoutePin = (pin: any): IVehicleRoutePin => {
  const newVehicleRoutePin: IVehicleRoutePin = {
    time: parsePinTime(pin.time),
    address: parsePinAddress(pin.address),
    lat: parsePinLat(pin.lat),
    lng: parsePinLng(pin.lng),
  };
  return newVehicleRoutePin;
};
