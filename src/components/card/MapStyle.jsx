import React from 'react';

import { BsThreeDots } from "react-icons/bs";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";
import { FaStreetView } from "react-icons/fa6";
import Dropdown from "components/dropdown";


export function MapStyle({ setMapStyle, mapStyle, transparent }) {
    const [open, setOpen] = React.useState(false);
    return (
        <Dropdown
            button={
                <button
                    onClick={() => setOpen(!open)}
                    open={open}
                    className={`flex items-center text-xl hover:cursor-pointer ${transparent
                        ? "bg-none text-white hover:bg-none active:bg-none"
                        : "bg-lightPrimary p-1 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                        } linear justify-center rounded-lg font-bold transition duration-200`}
                >
                    <BsThreeDots className="h-5 w-5" />
                </button>
            }
            animation={"origin-top-right transition-all duration-300 ease-in-out "}
            classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
            children={
                <div className="z-50 w-max rounded-md bg-white py-1.5 px-2 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p onClick={() => { setMapStyle("satellite-streets-v12"); setOpen(!open) }} className="hover:text-blue-600 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-normal">
                        <span>
                            <MdOutlineSatelliteAlt />
                        </span>
                        Satellite
                    </p>
                    <p onClick={() => { setMapStyle("light-v11"); setOpen(!open) }} className="hover:text-blue-600 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-normal">
                        <span>
                            <FaLightbulb />
                        </span>
                        Light
                    </p>
                    <p onClick={() => { setMapStyle("dark-v11"); setOpen(!open) }} className="hover:text-blue-600 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-normal">
                        <span>
                            <MdOutlineLightMode />
                        </span>
                        Dark
                    </p>
                    <p onClick={() => { setMapStyle("streets-v12"); setOpen(!open) }} className="hover:text-blue-600 flex cursor-pointer items-center gap-2 text-gray-600 hover:font-normal">
                        <span>
                            <FaStreetView />
                        </span>
                        Streets
                    </p>
                </div>
            }
        />
    );
}