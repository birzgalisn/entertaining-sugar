import { useSelector } from "react-redux";
import { selectRouteReportState } from "@/store/slice";
import useVehicleRoutes from "@/hooks/useVehicleRoutes";
import useRouteReportForm from "@/hooks/useRouteReportForm";
import { formatSecondsSpent } from "@/helpers/getSecondsSpent";
import Layout from "@/common/layout/Layout";
import Row from "@/common/row/Row";
import RadixSelect from "@/common/radix/select/RadixSelect";
import Map from "@/common/map/Map";
import Summary from "@/common/summary/Summary";
import Button from "@/common/button/Button";
import Calendar from "@/common/calendar/Calendar";
import "@/App.scss";

const App: React.FC<{}> = () => {
  const { from, till } = useSelector(selectRouteReportState);
  const { vehicleRoutesHistory, statistics, handleGetVehicleRoutes } =
    useVehicleRoutes();
  const { vehicleOptions, onVehicleChange, onFromChange, onTillChange } =
    useRouteReportForm();

  return (
    <Layout>
      <div className="mp-report">
        <h1 className="mp-report-title">Route report</h1>
        <form onSubmit={handleGetVehicleRoutes}>
          <fieldset className="mp-report-fieldset">
            <Row title="Vehicle number" center required>
              <RadixSelect
                placeholder="Select vehicle"
                items={vehicleOptions}
                onValueChange={onVehicleChange}
              />
            </Row>
            <Row className="mp-report-time" title="Period">
              <Calendar
                label="From"
                {...{ from, till }}
                setTime={onFromChange}
              />
              <Calendar
                label="Till"
                {...{ from, till }}
                setTime={onTillChange}
              />
            </Row>
          </fieldset>
          {vehicleRoutesHistory && (
            <>
              <Map {...{ vehicleRoutesHistory }} />
              <section className="mp-report-summary">
                <Summary title={statistics.distanceInKm} desc="Km driven" />
                <Summary
                  title={formatSecondsSpent(statistics.drivingInSeconds)}
                  desc="Driving time"
                />
                <Summary
                  title={formatSecondsSpent(statistics.standingInSeconds)}
                  desc="Standing time"
                />
              </section>
            </>
          )}
          <div className="mp-report-actions">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default App;
