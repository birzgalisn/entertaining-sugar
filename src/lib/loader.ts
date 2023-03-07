import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: [],
});

export const mapOptions: google.maps.MapOptions = {
  center: { lat: 56.928, lng: 24.08166 },
  zoom: 6,
  mapTypeId: "roadmap",
  streetViewControl: false,
  mapTypeControlOptions: { mapTypeIds: [] },
};

export default loader;
