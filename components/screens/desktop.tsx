// import React, { Component,useState } from "react";
// import ContentArea from "../core/contentportion";
// import Dock from "../core/dock";
// import BackgroundImage from "../utils/background";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useKeyboardShortcuts } from "../../hooks/useKeyBoard";
import { useCallback, useEffect } from "react";
import { closeStartMenu } from "../../store/features/ui/uiSlice";
import BackgroundImage from "../utils/background";
import QuickSettingsMenu from "../apps/quickSettings/quickSettings";
import StartMenu from "../apps/startMenu/startMenu";
import Dock from "../core/dock";
import WindowManager from "../core/windowManager/WindowManager";
import { useAppDispatch } from "../../hooks/useAppSelector";
import { setInstalledApps } from "../../store/features/apps/appsSlice";
import { AppManifest } from "../../types/appManifest";


// function Desktop() {
//   return (
//     <div  overflow-hidden="true">
//       <BackgroundImage />
//       <div className="text-white">
//         <ContentArea />
//         <Dock />
//       </div>
//     </div>
//   );
// }

// export default Desktop




function Desktop() {
  // const { isStartMenuOpen, isQuickSettingsOpen } = useSelector((state: RootState) => state.ui);
    const { isStartMenuOpen } = useSelector((state: RootState) => state.ui);
    const dispatch = useAppDispatch();

    useEffect(() => {
    const initializeSystemApps = async () => {
      try {
        const response = await fetch('installedapps.json');
        const preinstalledApps: AppManifest[] = await response.json();
        
        dispatch(setInstalledApps(preinstalledApps));

      } catch (error) {
        console.error("Failed to initialize system apps:", error);
      }
    };

    initializeSystemApps();
  }, [dispatch]); 



  
  // Initialize system monitoring
  // useSystemMonitoring();
  
  // Setup keyboard shortcuts
  useKeyboardShortcuts();

  // Handle clicks outside start menu
  // const handleDesktopClick = useCallback((e: React.MouseEvent) => {
  //   if (isStartMenuOpen && !(e.target as Element).closest('#start-button, #start-menu')) {
  //     dispatch(closeStartMenu());
  //   }
  // }, [isStartMenuOpen, dispatch]);

  // Prevent context menu on desktop (optional)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // You can implement custom desktop context menu here
  }, []);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none"
      // onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <BackgroundImage />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 relative">
          <WindowManager />
          
          {/* Overlay Menus */}
          {isStartMenuOpen && <StartMenu />}
          {true && <QuickSettingsMenu />}
        </div>

        {/* Dock - Always at bottom */}
        <Dock />
      </div>

      {/* System Components */}
      {/* <NotificationCenter /> */}
      {/* <ContextMenu /> */}
    </div>
  );
}

export default Desktop;
