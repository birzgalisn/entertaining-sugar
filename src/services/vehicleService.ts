import vehicleAdapter from "@/adapters/vehicleAdapter";
import api from "@/lib/api";
import { IVehicle } from "@/types";

export interface IVehicleApiRespone {
  data: { units: any[] };
}

const getVehicles = async (): Promise<Array<IVehicle> | undefined> => {
  try {
    const res = await api.get<IVehicleApiRespone>("/unit/list.json");
    return vehicleAdapter(res.data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.log(e);
    }
  }
};

export default getVehicles;
