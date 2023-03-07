import { IVehicleRoutes } from "@/types";

export type TLatLngRange = {
  max: number;
  min: number;
};

const getMapBounds = (vehicle: IVehicleRoutes): google.maps.LatLngBounds => {
  let lat: TLatLngRange = { max: -90, min: 90 };
  let lng: TLatLngRange = { max: -180, min: 180 };

  vehicle.routes.forEach(({ start, end }) => {
    const routeLat: TLatLngRange =
      start.lat > end.lat
        ? { max: start.lat, min: end.lat }
        : { max: end.lat, min: start.lat };
    const routeLng: TLatLngRange =
      start.lng < end.lng
        ? { max: end.lng, min: start.lng }
        : { max: start.lng, min: end.lng };

    if (routeLat.max > lat.max) lat.max = routeLat.max;
    if (routeLat.min < lat.min) lat.min = routeLat.min;
    if (routeLng.max > lng.max) lng.max = routeLng.max;
    if (routeLng.min < lng.min) lng.min = routeLng.min;
  });

  const min = new google.maps.LatLng(lat.min, lng.min);
  const max = new google.maps.LatLng(lat.max, lng.max);
  const bounds = new google.maps.LatLngBounds().extend(min).extend(max);

  return bounds;
};

export default getMapBounds;
