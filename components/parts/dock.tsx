import React from "react";

import { useDispatch } from "react-redux";
import { addProcess } from "../utils/processes/store";
import { InstalledApps } from "../utils/processes/alltypes";
import TaskManager from "../apps/taskManager";
import { Dolo } from "./windowManager/window";


let apps: InstalledApps[] = [
  {
    id: "HAHA",
    icon: "https://i.imgur.com/CqvxoiW.png",
    title: "start",
    type:"thirdParty",
    coreComponentId:"NULL",
    appPageUrl: "http://www.google.com/",
  },
  {
    id: "HAHA",
    icon: "https://i.imgur.com/Whdx3HA.png",
    title: "music",
    type:"thirdParty",
    coreComponentId:"NULL",
    appPageUrl:"https://www.jiosaavn.com/"
  },
  {
    id: "haha",
    icon: "https://i.imgur.com/3cuHzpG.png",
    title: "Explorer",
    type:"thirdParty",
    coreComponentId:"NULL",
    appPageUrl :"http://papertoilet.com/"
  },
  {
    id: "haha",
    icon: "https://i.imgur.com/V7W4MPv.png",
    title: "Calculator",
    type:"thirdParty",
    coreComponentId:"NULL",
    appPageUrl: "https://www.calculator.com/"
  },
  {
    id: "haha",
    icon: "https://i.imgur.com/UAGCLm7.png",
    title: "Photopea",
    type:"thirdParty",
    coreComponentId:"NULL",
    appPageUrl:"https://www.photopea.com/"
  },
  {
    id: "haha",
    icon: "https://i.imgur.com/4oiviWO.png",
    title: "Task Manager",
    type:"core",
    coreComponentId:"TaskManager",
    appPageUrl:"https://www.photopea.com"
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
  const handelLaunch = (e: any,item:any) => {
    const duck: InstalledApps = {
      appPageUrl: item.appPageUrl,
      icon: item.icon,
      id: Date.now().toString(36) + Math.random().toString(36),
      type:item.type,
      coreComponentId:item.coreComponentId,
      title: item.title,
    };
    e.preventDefault();
    console.log("tapped");
    dispatch(addProcess(duck));
  };

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
          (item: { id: string; icon: string; title: string;appPageUrl:string }, i: number) => (
            <button
              onClick={(e) => {
                handelLaunch(e,item);

                //   console.log("tapped")
                // dispatch(addProcess(duck));
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
