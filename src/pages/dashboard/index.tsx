import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useDashStore } from "../../store/dash-store";

const Dashboard: NextPageWithLayout = () => {
  const dash = useDashStore((s) => s.dash);
  const increment = useDashStore((s) => s.increment);

  return (
    <div>
      <span>Hello world</span>
      <button onClick={increment}>Click</button>
      {dash.spaces.map((space) => {
        return <div key={space.id}>{space.text}</div>;
      })}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
