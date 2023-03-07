import { IBaseVehicleRoute, TVehicleRoute } from "@/types";
import assertNever from "./assertNever";
import { isNumber, isString, isVehicleRouteType } from "./isType";
import { toNewVehicleRoutePin } from "./toNewVehicleRoutePin";

export const parseRouteId = (id: unknown): number => {
  if (!id || !isNumber(id)) {
    throw new Error("Incorrect or missing route id: " + id);
  }
  return id;
};

const parseVehicleRouteType = (type: unknown): TVehicleRoute["type"] => {
  if (!type || !isVehicleRouteType(type)) {
    throw new Error("Incorrect or missing vehicle route type: " + type);
  }
  return type;
};

const parseVehicleRouteDistance = (distance: unknown): number => {
  if (!distance || !isNumber(distance)) {
    throw new Error("Incorrect or missing vehicle route distance: " + distance);
  }
  return distance;
};

const parseVehicleRoutePolyline = (polyline: unknown): string => {
  if (!polyline || !isString(polyline)) {
    throw new Error("Incorrect or missing vehicle route polyline: " + polyline);
  }
  return polyline;
};

export const toNewVehicleRoute = (route: any): TVehicleRoute => {
  const base: IBaseVehicleRoute = {
    route_id: parseRouteId(route.route_id),
    start: toNewVehicleRoutePin(route.start),
    end: toNewVehicleRoutePin(route.end),
  };

  const type = parseVehicleRouteType(route.type);

  switch (type) {
    case "stop":
      return {
        ...base,
        type,
      };
    case "route":
      return {
        ...base,
        type,
        distance: parseVehicleRouteDistance(route.distance),
        polyline: parseVehicleRoutePolyline(route.polyline),
      };
    default:
      return assertNever(type);
  }
};
