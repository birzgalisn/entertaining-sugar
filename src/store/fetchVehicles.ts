import { createAsyncThunk } from "@reduxjs/toolkit";
import { IVehicle } from "@/types";
import getVehicles from "@/services/vehicleService";

const fetchVehicles = createAsyncThunk<Array<IVehicle>>(
  "routeReport/fetchVehicles",
  async () => {
    const vehicles = await getVehicles();
    return vehicles ?? [];
  }
);

export default fetchVehicles;
