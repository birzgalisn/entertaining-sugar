import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRouteReportState,
  setTimeFrom,
  setTimeTill,
  setVehicle,
} from "@/store/slice";
import { TRadixSelectOption } from "@/common/radix/select/RadixSelect";

const useRouteReportForm = () => {
  const dispatch = useDispatch();
  const { vehicles } = useSelector(selectRouteReportState);

  const vehicleOptions: Array<TRadixSelectOption> = useMemo(
    () =>
      vehicles.map((vehicle) => ({
        value: vehicle.unit_id.toString(),
        label: vehicle.number,
      })) ?? [],
    [vehicles]
  );

  const onVehicleChange = useCallback(
    (value: string) => {
      dispatch(setVehicle(value));
    },
    [dispatch]
  );

  const onFromChange = useCallback(
    (value: Date | undefined) => {
      dispatch(setTimeFrom(!!value ? value.toString() : undefined));
    },
    [dispatch]
  );

  const onTillChange = useCallback(
    (value: Date | undefined) => {
      dispatch(setTimeTill(!!value ? value.toString() : undefined));
    },
    [dispatch]
  );

  return { vehicleOptions, onVehicleChange, onFromChange, onTillChange };
};

export default useRouteReportForm;
