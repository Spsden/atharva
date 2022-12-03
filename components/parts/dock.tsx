import React from "react";

import { useDispatch } from "react-redux";
import { addProcess } from "../utils/processes/store";
import { InstalledApps } from "../utils/processes/alltypes";
import uniqid from 'uniqid';

let apps: { id: number; icon: string; name: string }[] = [
  {
    id: 1,
    icon: "https://i.imgur.com/CqvxoiW.png",
    name: "start",
  },
  {
    id: 2,
    icon: "https://i.imgur.com/Whdx3HA.png",
    name: "music",
  },
  {
    id: 3,
    icon: "https://i.imgur.com/3cuHzpG.png",
    name: "Explorer",
  },
  {
    id: 3,
    icon: "https://i.imgur.com/V7W4MPv.png",
    name: "Calculator",
  },
  {
    id: 4,
    icon: "https://i.imgur.com/UAGCLm7.png",
    name: "Photopea",
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
  //const process = useSelector((state) => state.)

  const duck: InstalledApps = {
    appPageUrl: "https://www.photopea.com/",
    icon: "https://i.imgur.com/UAGCLm7.png",
    id: uniqid(),
    title: "photopea",
  };

  const dispatch = useDispatch();
  const handelLaunch = (e: any) => {
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
          (item: { id: number; icon: string; name: string }, i: number) => (
            <button
              onClick={(e) => {
                handelLaunch(e);

                //   console.log("tapped")
                // dispatch(addProcess(duck));
              }}
              key={item.name}
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
