import { configureStore } from "@reduxjs/toolkit";
import routeReportSlice from "@/store/slice";

export const store = configureStore({
  reducer: {
    routeReport: routeReportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
