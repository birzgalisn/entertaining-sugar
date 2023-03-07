import useGoogleMaps from "@/hooks/useGoogleMaps";
import { IVehicleRoutes } from "@/types";
import "./Map.scss";

interface IMap {
  vehicleRoutesHistory: Array<IVehicleRoutes>;
}

const Map: React.FC<IMap> = ({ vehicleRoutesHistory }) => {
  const { googleMapDiv } = useGoogleMaps(vehicleRoutesHistory);

  return <div className="mp-map" ref={googleMapDiv}></div>;
};

export default Map;
