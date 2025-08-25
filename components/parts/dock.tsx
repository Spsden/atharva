import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../../store/store";
import Image from "next/image";
import { InstalledApps } from "../../types/alltypes";
import { toggleStartMenu, closeStartMenu } from "../../store/features/ui/uiSlice";

// Installed Apps List
let apps: InstalledApps[] = [
  {
    id: "start_process",
    icon: "/assets/start.png",
    title: "Start",
    type: "core",
    coreComponentId: 0,
    appPageUrl: "http://www.google.com/",
  },
  {
    id: "explorer_process",
    icon: "/assets/app_icons/explorer.png",
    title: "Explorer",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.jiosaavn.com/",
  },
  {
    id: "browser_process",
    icon: "/assets/app_icons/browser.png",
    title: "Browser",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.google.com/webhp?igu=1",
  },
  {
    id: "calc_process",
    icon: "/assets/app_icons/calculator.png",
    title: "Calculator",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.calculator.com/",
  },
  {
    id: "photopea_process",
    icon: "/assets/app_icons/photopea.png",
    title: "Photopea",
    type: "thirdParty",
    coreComponentId: -1,
    appPageUrl: "https://www.photopea.com/",
  },
  {
    id: "taskmanager_process",
    icon: "/assets/app_icons/tasks.png",
    title: "Task Manager",
    type: "coreApp",
    coreComponentId: 1,
    appPageUrl: "null",
  },
];

function Dock() {
  const dispatch = useDispatch();
  const isStartMenuOpen = useSelector((state: RootStates) => state.ui.isStartMenuOpen);

  

  // Separate start button & other apps
  const startApp = apps.find((app) => app.id === "start_process");
  const otherApps = apps.filter((app) => app.id !== "start_process");

  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        margin: "5px",
        right: "3px",
        left: "3px",
      }}
      className="flex justify-between fixed bottom-0 items-center mb-1 bg-stone-800/50 rounded-lg drop-shadow-2xl h-13 p-0.5"
    >
      <div className="flex space-x-1 items-center text-white">
        {/* --- Start Button --- */}
        {startApp && (
          <button
          id="start-button"
            key={startApp.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleStartMenu());
            }}
            className={`w-11 m-1 hover:bg-slate-700 rounded-lg p-1 transition-colors ${
              isStartMenuOpen ? "bg-slate-700" : ""
            }`}
          >
            <Image src={startApp.icon} alt={startApp.title} width={40} height={40} />
          </button>
        )}

        {/* --- Other Apps --- */}
        {otherApps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(`Opening: ${app.title}`);
              // TODO: Dispatch open app window here later if needed
            }}
            className="w-11 m-1 hover:bg-slate-700 rounded-lg p-1 transition-colors"
          >
            <Image src={app.icon} alt={app.title} width={40} height={40} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dock;
