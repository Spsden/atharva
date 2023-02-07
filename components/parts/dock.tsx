import React from "react";

import { useDispatch } from "react-redux";
import { addProcess, removeProcess } from "../utils/processes/store";
import { InstalledApps } from "../utils/processes/alltypes";

let apps: InstalledApps[] = [
  {
    id: "start_process",
    icon: "https://i.imgur.com/CqvxoiW.png",
    title: "start",
    type: "core",
    coreComponentId: 0,
    appPageUrl: "http://www.google.com/",
  },
  {
    id: "music_process",
    icon: "https://i.imgur.com/Whdx3HA.png",
    title: "music",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.jiosaavn.com/",
  },
  {
    id: "explorer_process",
    icon: "https://i.imgur.com/3cuHzpG.png",
    title: "Explorer",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.google.com/webhp?igu=1",
  },
  {
    id: "calc_process",
    icon: "https://i.imgur.com/V7W4MPv.png",
    title: "Calculator",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.calculator.com/",
  },
  {
    id: "photopea_process",
    icon: "https://i.imgur.com/UAGCLm7.png",
    title: "Photopea",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.photopea.com/",
  },
  {
    id: "taskmanager_process",
    icon: "https://i.imgur.com/4oiviWO.png",
    title: "Task Manager",
    type: "coreApp",
    coreComponentId: 1,
    appPageUrl: "null",
  },
];

let right: { id: number; icon: string; name: string }[] = [
  {
    id: 1,
    icon: "https://i.imgur.com/7TX5Py4.png",
    name: "start",
  },
  {
    id: 2,
    icon: "https://i.imgur.com/QE4i3Dq.png",
    name: "music",
  },
];

function Dock() {
  const dispatch = useDispatch();
  const handelLaunch = (e: any, item: any) => {
    const duck: InstalledApps = {
      appPageUrl: item.appPageUrl,
      icon: item.icon,
      id: item.id,
      type: item.type,
      coreComponentId: item.coreComponentId,
      title: item.title,
    };
    e.preventDefault();
    console.log("tapped");
    dispatch(addProcess(duck));
  };

  function closeHandler(id: string) {
    console.log(id);

    dispatch(removeProcess(id));
  }
  let isAppOpen = false;

  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        margin: "10px",
        right: "5px",
        left: "5px",
      }}
      className="flex justify-between fixed bottom-0  items-center  mb-1 bg-gray-800/[0.1]  rounded-lg   drop-shadow-2xl h-13 p-0.5"
    >
      <div className="text-white align-center">
        <p>🌤️Cloudy 22 ℃</p>
      </div>
      <div>
        {apps.map(
          (
            item: {
              id: string;
              icon: string;
              title: string;
              appPageUrl: string;
              type: string;
            },
            i: number
          ) => (
            <button
              onClick={(e) => {
                if (item.type == "core") {
                  if (!isAppOpen) {
                    handelLaunch(e, item);
                    isAppOpen = !isAppOpen;
                  } else {
                    closeHandler(item.id);
                    isAppOpen = !isAppOpen;
                  }
                } else {
                  handelLaunch(e, item);
                }
              }}
              key={item.id}
              className={"w-11 m-1 hover:bg-slate-700 rounded-lg p-1"}
            >
              <img src={item.icon} alt="icon" />
            </button>
          )
        )}
      </div>
      <div className="hover:bg-slate-700 rounded-lg">
        {right.map(
          (item: { id: number; icon: string; name: string }, i: number) => (
            <button key={item.name} className={"w-8 p-1.5 m-1 align-bottom "}>
              <img src={item.icon} alt="icon" />
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Dock;
