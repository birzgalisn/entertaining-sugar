import { IRouteApiResponse } from "@/services/routeService";
import { IVehicleRoutes } from "@/types";
import { parseUnitId } from "@/utils/toNewVehicle";
import { toNewVehicleRoute } from "@/utils/toNewVehicleRoute";

interface IVehicleRoutesAdapter extends IRouteApiResponse {}

const vehicleRoutesAdapter = ({
  data,
}: IVehicleRoutesAdapter): Array<IVehicleRoutes> => {
  return data.units.map((u) => ({
    unit_id: parseUnitId(u.unit_id),
    routes: u.routes.map((r) => toNewVehicleRoute(r)),
  }));
};

export default vehicleRoutesAdapter;
