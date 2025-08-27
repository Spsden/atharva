import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../../store/store";
import { EnhancedWindow } from "../WindowComponent";
import { killProcess } from "../../../store/features/apps/appsSlice";
import { windowsSlice } from "../../../store/features/windows/windowsSlice";
import { DynamicApp } from "../../../types/appManifest";

// CONNECTED: This component is now the primary manager for rendering all windows.
// It correctly sources data from the `windows` and `apps` slices.
const WindowManager: React.FC = () => {
  const dispatch = useDispatch();
  const { windows } = useSelector((state: RootState) => state.windows);
  const { runningProcesses, dynamicApps} = useSelector((state: RootState) => state.apps);

  const handleWindowClose = (windowId: string) => {
    const windowToClose = windows[windowId];
    if (windowToClose) {
      // Dispatch actions to kill the process and close the window
      dispatch(killProcess(windowToClose.processId));
      dispatch(windowsSlice.actions.closeWindow(windowId));
    }
  };
  console.log(runningProcesses);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Object.values(windows).map((window) => {
        const process = runningProcesses[window.processId];
        // Ensure the process and its corresponding app component are loaded
        if (!process || !dynamicApps[process.appId]?.isLoaded) {
          return null;
        }

        const app: DynamicApp = dynamicApps[process.appId];

        return (
            <div>lll</div>
        //   <div key={window.windowId} className="pointer-events-auto" style={{ zIndex: window.zIndex }}>
        //     <EnhancedWindow
        //       windowId={window.windowId}
        //       appComponent={app.component}
        //       onClose={() => handleWindowClose(window.windowId)}
        //     />
        //   </div>
        );
      })}
    </div>
  );
};

export default WindowManager;