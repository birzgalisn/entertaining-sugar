import { useMemo, useState } from "react";
import { IVehicleRoutes } from "@/types";
import { useSelector } from "react-redux";
import { selectRouteReportState } from "@/store/slice";
import { calculateSecondsSpent } from "@/helpers/getSecondsSpent";
import getVehicleRoutes from "@/services/routeService";
import assertNever from "@/utils/assertNever";

type TStatistics = {
  distanceInKm: number;
  drivingInSeconds: number;
  standingInSeconds: number;
};

const initialStatistics: TStatistics = {
  distanceInKm: 0,
  drivingInSeconds: 0,
  standingInSeconds: 0,
};

const useVehicleRoutes = () => {
  const { selectedVehicle, from, till } = useSelector(selectRouteReportState);
  const [vehicleRoutesHistory, setVehicleRoutesHistory] = useState<
    Array<IVehicleRoutes> | undefined
  >();

  const statistics = useMemo<TStatistics>(() => {
    if (!vehicleRoutesHistory) return initialStatistics;
    const [vehicle] = vehicleRoutesHistory;
    const calculatedStatistics = vehicle.routes.reduce((a, b) => {
      if (b.type === "stop") {
        return {
          ...a,
          standingInSeconds: a.standingInSeconds + calculateSecondsSpent(b),
        };
      } else if (b.type === "route") {
        return {
          ...a,
          distanceInKm: a.distanceInKm + b.distance,
          drivingInSeconds: a.drivingInSeconds + calculateSecondsSpent(b),
        };
      } else {
        return assertNever(b);
      }
    }, initialStatistics);
    return calculatedStatistics;
  }, [vehicleRoutesHistory]);

  const handleGetVehicleRoutes = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedVehicle || !from || !till) return;
    const vehicleRoutes = await getVehicleRoutes({
      unit_id: selectedVehicle.unit_id,
      from,
      till,
    });
    setVehicleRoutesHistory(vehicleRoutes ?? []);
  };

  return { vehicleRoutesHistory, statistics, handleGetVehicleRoutes };
};

export default useVehicleRoutes;
