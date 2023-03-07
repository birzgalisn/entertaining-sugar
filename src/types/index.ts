export interface IVehicle {
  unit_id: number;
  number: string;
}

export interface IVehicleRoutePin {
  time: string;
  address: string;
  lat: number;
  lng: number;
}

export interface IBaseVehicleRoute {
  route_id: number;
  start: IVehicleRoutePin;
  end: IVehicleRoutePin;
}

export interface IVehicleRouteDone extends IBaseVehicleRoute {
  type: "route";
  distance: number;
  polyline: string;
}

export interface IVehicleRouteStop extends IBaseVehicleRoute {
  type: "stop";
}

export type TVehicleRoute = IVehicleRouteDone | IVehicleRouteStop;

export interface IBaseVehicleRoutes {
  unit_id: IVehicle["unit_id"];
}

export interface IVehicleRoutes extends IBaseVehicleRoutes {
  routes: Array<TVehicleRoute>;
}
