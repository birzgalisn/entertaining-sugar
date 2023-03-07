import { useEffect, useRef, useState } from "react";
import { IVehicleRoutes } from "@/types";
import loader, { mapOptions } from "@/lib/loader";
import getDecodedPolyline from "@/helpers/getDecodedPolyline";
import getMapBounds from "@/helpers/getMapBounds";
import assertNever from "@/utils/assertNever";
import pin from "@/assets/pin.svg";

type TGoogle = typeof google;

const useGoogleMaps = (vehicleRoutesHistory: Array<IVehicleRoutes>) => {
  const [google, setGoogle] = useState<TGoogle>();
  const [map, setMap] = useState<google.maps.Map>();
  const [polylines, setPolylines] = useState<Array<google.maps.Polyline>>([]);
  const [markers, setMarkers] = useState<Array<google.maps.Marker>>([]);
  const googleMapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google and initialize Maps
    loader.load().then((g) => {
      const m = new g.maps.Map(googleMapDiv.current as HTMLElement, mapOptions);
      setMap(m);
      setGoogle(g);
    });
  }, []);

  useEffect(() => {
    // Clear all polylines and markers between the route reports
    clearVehicleRoutes();
    // Construct the new route report on the map
    placeVehicleRoutes();
  }, [google, map, vehicleRoutesHistory]);

  const clearVehicleRoutes = () => {
    if (!google || !map) return;
    // Clear and delete all polylines from the map
    polylines.forEach((p) => {
      p.setMap(null);
    });
    setPolylines([]);
    // Clear and delete all markers from the map
    markers.forEach((m) => {
      m.setMap(null);
    });
    setMarkers([]);
  };

  const placeVehicleRoutes = () => {
    if (!google || !map) return;
    // Place markers and polylines based on vehicle routes history
    const [vehicle] = vehicleRoutesHistory;
    vehicle.routes.forEach((r) => {
      if (r.type === "stop") {
        const { lat, lng } = r.end;
        placeMarker({ lat, lng });
      } else if (r.type === "route") {
        const path = getDecodedPolyline(r.polyline);
        placePolyline(path);
      } else {
        assertNever(r);
      }
    });
    // Get map bounds by calculating min/max lat/lng from route start/end positions
    const bounds = getMapBounds(vehicle);
    // Set map center and apply the bounds
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  };

  const placeMarker = (position: google.maps.LatLngLiteral) => {
    if (!google || !map) return;
    // Initialize marker
    const routeMarker = new google.maps.Marker({
      position,
      map,
      icon: pin,
    });
    // Keep track of all markers on the map
    setMarkers((prevMarkers) => [...prevMarkers, routeMarker]);
  };

  const placePolyline = (path: Array<google.maps.LatLngLiteral>) => {
    if (!google || !map) return;
    // Place route start/end markers on the map
    placeMarker(path[0]);
    placeMarker(path[path.length - 1]);
    // Construct vehicle route as a polyline between the markers
    const routePolyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#39b0fa",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    routePolyline.setMap(map);
    // Keep track of all polylines on the map
    setPolylines((prevPolylines) => [...prevPolylines, routePolyline]);
  };

  return { googleMapDiv };
};

export default useGoogleMaps;
