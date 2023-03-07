import { IVehicleApiRespone } from "@/services/vehicleService";
import { IVehicle } from "@/types";
import { toNewVehicle } from "@/utils/toNewVehicle";

interface IVehicleAdapter extends IVehicleApiRespone {}

const vehicleAdapter = ({ data }: IVehicleAdapter): Array<IVehicle> => {
  return data.units.map((u) => toNewVehicle(u));
};

export default vehicleAdapter;
