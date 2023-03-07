import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchVehicles from "@/store/fetchVehicles";
import { IVehicle } from "@/types";
import { RootState } from "@/store";
import toISODateString from "@/utils/toISODateString";

interface IRouteReportInitialState {
  vehicles: Array<IVehicle>;
  selectedVehicle?: IVehicle;
  from?: string;
  till?: string;
}

const initialState: IRouteReportInitialState = {
  vehicles: [],
};

const routeReportSlice = createSlice({
  name: "routeReport",
  initialState,
  reducers: {
    setVehicle(state: IRouteReportInitialState, action: PayloadAction<string>) {
      const vehicle = state.vehicles.find(
        (v) => v.unit_id === Number(action.payload)
      );
      return { ...state, selectedVehicle: vehicle };
    },
    setTimeFrom(
      state: IRouteReportInitialState,
      action: PayloadAction<string | undefined>
    ) {
      const from = !!action.payload
        ? toISODateString(action.payload)
        : action.payload;
      return { ...state, from };
    },
    setTimeTill(
      state: IRouteReportInitialState,
      action: PayloadAction<string | undefined>
    ) {
      const till = !!action.payload
        ? toISODateString(action.payload)
        : action.payload;
      return { ...state, till };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, (state, { payload }) => {
      state.vehicles.push(...payload);
    });
  },
});

export const { setVehicle, setTimeFrom, setTimeTill } =
  routeReportSlice.actions;

export const selectRouteReportState = (state: RootState) => state.routeReport;

export default routeReportSlice.reducer;
