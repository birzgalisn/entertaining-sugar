const getDecodedPolyline = (
  encodedPolyline: string,
  precision?: number
): Array<google.maps.LatLngLiteral> => {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates: Array<google.maps.LatLngLiteral> = [],
    shift = 0,
    result = 0,
    byte = 0,
    latitude_change = 0,
    longitude_change = 0,
    factor = Math.pow(10, precision ?? 5);

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < encodedPolyline.length) {
    // Reset shift, result, and byte
    byte = 0;
    shift = 0;
    result = 0;

    do {
      byte = encodedPolyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;

    do {
      byte = encodedPolyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ lat: lat / factor, lng: lng / factor });
  }

  return coordinates;
};

export default getDecodedPolyline;
