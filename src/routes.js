import React from "react";

// Admin Imports
import Home from "views/home";
import Alert from "views/alert";
import MonitorAI from "views/monitor_ai";
import Network from "views/network";
import Rescure from "views/rescure";

import { MdModeOfTravel } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { MdCrisisAlert } from "react-icons/md";
import { BsStars } from "react-icons/bs";
// network
import { GiMeshNetwork } from "react-icons/gi";

const routes = [
  {
    name: "Home",
    path: "home",
    icon: <HiMiniHome className="h-6 w-6" />,
    component: <Home />,
  },
  {
    name: "Alert",
    path: "alert",
    icon: <MdCrisisAlert className="h-6 w-6" />,
    component: <Alert />,
  },
  {
    name: "Rescue",
    path: "Rescue",
    icon: <MdModeOfTravel className="h-6 w-6" />,
    component: <Rescure />,
  },
  {
    name: "Monitor AI",
    icon: <BsStars className="h-6 w-6" />,
    path: "monitor-ai",
    component: <MonitorAI />,
  },
  {
    name: "Network",
    path: "network",
    icon: <GiMeshNetwork className="h-6 w-6" />,
    component: <Network />,
  },
];
export default routes;
