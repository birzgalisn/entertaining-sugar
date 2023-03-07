import vehicleRoutesAdapter from "@/adapters/routeAdapter";
import api from "@/lib/api";
import { IVehicle, IVehicleRoutes } from "@/types";

type TUnit = {
  unit_id: any;
  routes: any[];
};

export interface IRouteApiResponse {
  data: { units: Array<TUnit> };
}

interface IGetVehicleRoutes {
  unit_id: IVehicle["unit_id"];
  from: string;
  till: string;
}

const getVehicleRoutes = async (
  props: IGetVehicleRoutes
): Promise<Array<IVehicleRoutes> | undefined> => {
  try {
    const res = await api.get<IRouteApiResponse>("/route/list.json", {
      params: { ...props, include: "polyline" },
    });
    return vehicleRoutesAdapter(res.data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log(e);
    }
  }
};

export default getVehicleRoutes;
