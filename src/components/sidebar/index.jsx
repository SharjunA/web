/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`w-48 sm:none duration-175 linear gap-1 fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[16px] mt-[50px] `}>
        <div className="flex flex-col items-center mt-1 ml-1 h-2.5 font-poppins text-[16px] font-bold uppercase text-navy-700 dark:text-white">
          Avalanche <span class="font-medium">Detector</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className=" pt-1">
        <Links routes={routes} />
      </ul>

    </div>
  );
};

export default Sidebar;
