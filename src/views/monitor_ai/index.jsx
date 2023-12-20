import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

import PieChartCard from "./components/PieChartCard";
import Daily_Probability from "./components/Daily_Probability";

import { columnsDataCheck } from "./variables/columnsData";
import tableDataCheck from "./variables/tableDataCheck.json";


const MonitorAI = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="col-span-1 lg:mb-0 ">
          <Project />
        </div>

        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <Daily_Probability />
          <PieChartCard />
        </div>
      </div>
    </div>
  );
};

export default MonitorAI;

