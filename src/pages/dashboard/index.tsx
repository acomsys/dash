import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useDashStoreShallow } from "../../store/dash-store-shallow-hook";

const Dashboard: NextPageWithLayout = () => {
  const dashStore = useDashStoreShallow();

  return (
    <div>
      <span>Hello world</span>
      <button onClick={dashStore.increment}>Click</button>
      {dashStore.dash.spaces.map((space) => {
        return <div key={space.id}>{space.text}</div>;
      })}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
