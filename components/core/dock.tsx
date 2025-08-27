import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { InstalledApps } from "../../types/alltypes";
import { toggleStartMenu, closeStartMenu } from "../../store/features/ui/uiSlice";

// Installed Apps List
import { appsSlice, loadDynamicApp, startProcess } from "../../store/features/apps/appsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createWindow, focusWindow } from "./WindowComponent";
import { installApp } from "../../services/FileSystemService";
import { AppManifest } from "../../types/appManifest";

// These are hardcoded as they are part of the OS shell.
const coreApps: AppManifest[] = [
  {
    id: 'start_menu',
    name: 'Start',
    version: '1.0.0',
    icon: '/assets/icons/start.png',
    description: 'Start menu for launching programs',
    type: 'core',
    main: '',
  },
  {
    id: 'explorer',
    name: 'Explorer',
    version: '1.0.0',
    icon: '/assets/icons/explorer.png',
    description: 'File and folder browser',
    type: 'core',
    main: 'index.js',
  },
];


function Dock() {
  const dispatch = useDispatch();
  const isStartMenuOpen = useSelector((state: RootStates) => state.ui.isStartMenuOpen);

  const { runningProcesses, installedApps,dynamicApps } = useAppSelector((state) => state.apps)
  const { windows } = useAppSelector((state) => state.windows)

  const handleAppLaunch = async (appManifest: AppManifest) => {
    const existingProcess = Object.values(runningProcesses).find(
      (p) => p.appId === appManifest.id
    )
    console.log(installedApps);



    if (existingProcess) {
      const existingWindow = Object.values(windows).find(
        (w) => w.processId === existingProcess?.processId
      )

      if (existingWindow) {
        console.log(`App '${appManifest.name}' is already running. Focusing window.`);
        dispatch(focusWindow(existingWindow?.windowId))
        return
      }
    }

    console.log(`Launching app: ${appManifest.name}`);
    try {
      // Register the app as "installed" in the state
        if (!dynamicApps[appManifest.id]?.isLoaded) {
        await dispatch(loadDynamicApp(appManifest.id)).unwrap();
      }

      const processId = `proc_${appManifest.id}_${Date.now()}`;
      const windowId = `win_${processId}`;


      dispatch(startProcess({ appId: appManifest.id, processId, windowId }));
      dispatch(createWindow({ processId, manifest: appManifest }));

    } catch (error) {

    }


  }

  const allAppsToDisplay = useMemo(() => {
    return [...coreApps, ...Object.values(installedApps)];
  }, [installedApps]);




  return (
    <div
      style={{ backdropFilter: "blur(20px)" }}
      className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center bg-stone-800/50 rounded-lg p-1 space-x-1"
    >
      {allAppsToDisplay.map((app) => {
        // 5. RENDER BUTTONS, WITH A SPECIAL CASE FOR THE START MENU
        if (app.id === 'start_menu') {
          return (
            <button
              key={app.id}
              title={app.name}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(toggleStartMenu())
              }}
              className={`w-11 h-11 hover:bg-slate-700 rounded-lg p-1 transition-colors ${isStartMenuOpen ? "bg-slate-700" : ""
                }`}
            >
              <Image src={app.icon} alt={app.name} width={40} height={40} />
            </button>
          );
        }

        // All other buttons (core or installed) use the universal launch handler.
        return (
          <button
            key={app.id}
            title={`Launch ${app.name}`}
            onClick={() => handleAppLaunch(app)}
            className="w-11 h-11 hover:bg-slate-700 rounded-lg p-1 transition-colors"
          >
            <Image src={app.icon} alt={app.name} width={40} height={40} />
          </button>
        );
      })}
    </div>
  );

}

export default Dock;
