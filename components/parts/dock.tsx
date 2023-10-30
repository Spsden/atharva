import React from "react";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  addProcess,
  removeProcess,
  RootState,
  selectProcess,
} from "../utils/processes/store";
import { InstalledApps } from "../utils/processes/alltypes";

import { useCloseCore } from "../../hooks/closeStartHook";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

//const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
let apps: InstalledApps[] = [
  {
    id: "start_process",
    icon: "https://i.imgur.com/20NiE9m.png",
    title: "start",
    type: "core",
    coreComponentId: 0,
    appPageUrl: "http://www.google.com/",
  },
  {
    id: "explorer_process",
    icon: "https://i.imgur.com/Whdx3HA.png",
    title: "Explorer",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.jiosaavn.com/",
  },
  {
    id: "browser_process",
    icon: "https://i.imgur.com/NUu0Ysa.png",
    title: "Browser",
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
  const allProcesses = useTypedSelector(selectProcess);
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

  const [coreStatus, handleCore] = useCloseCore();

  const existsInAllProcesses = (app: InstalledApps) => {
    for (let index = 0; index < allProcesses.length; index++) {
      if (allProcesses[index].id == app.id) {
        return true;
      }
    }

    return false;
  };

  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        margin: "5px",
        right: "3px",
        left: "3px",
      }}
      className="flex justify-between fixed bottom-0  items-center  mb-1  bg-stone-800/50  rounded-lg   drop-shadow-2xl h-13 p-0.5"
    >
      <div className="text-white align-center">
        <p>🌤️Cloudy 22 ℃</p>
      </div>
      <div>
        <ul className="list-none">
          {apps.map((item: InstalledApps, i: number) => (
            <li className="inline" key={i}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (item.type == "core") {
                    if (!coreStatus) {
                      handleCore(true, item);
                    } else {
                      handleCore(false, item);
                    }
                  } else {
                    if (!existsInAllProcesses(item)) handelLaunch(e, item);
                  }
                }}
                key={item.id}
                className={`w-11 m-1 hover:bg-slate-700 rounded-lg p-1 ${
                  existsInAllProcesses(item) ? "bg-slate-700" : ""
                }`}
              >
                <img src={item.icon} alt="icon" />
              </button>
            </li>
          ))}
        </ul>
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
