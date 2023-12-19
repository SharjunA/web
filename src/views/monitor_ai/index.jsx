import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

import PieChartCard from "./components/PieChartCard";
import DailyTraffic from "./components/DailyTraffic";
import CheckTable from "./components/CheckTable";

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
          <DailyTraffic />
          <PieChartCard />
        </div>
      </div>
      <div>
        <CheckTable
          columnsData={columnsDataCheck}
          tableData={tableDataCheck}
        />
      </div>
    </div>
  );
};

export default MonitorAI;


<div className="flex w-full flex-col gap-5">
  <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
    <div className="col-span-4 lg:!mb-0">
      <Banner />
    </div>

    <div className="col-span-3 lg:!mb-0">
      <Storage />
    </div>

    <div className="z-0 col-span-5 lg:!mb-0">
      <Upload />
    </div>
  </div>
  {/* all project & ... */}

  <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
    <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
      <Project />
    </div>
    <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
      <General />
    </div>

    <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
      <Notification />
    </div>
  </div>
</div>