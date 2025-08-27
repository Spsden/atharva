import React from 'react';
import dynamic from 'next/dynamic';
import { WinBoxControlInfo } from 'react-winbox';
import { useDispatch, useSelector } from 'react-redux';
import { windowsSlice } from '../../store/features/windows/windowsSlice';
import { storageSlice } from '../../store/features/storage/storageSlice';
import { WindowService } from '../../services/WindowService';
import { StorageService } from '../../services/StorageService';
import { FileSystemService } from '../../services/FileSystemService';
import { AppProps, SystemAPI } from '../../types/appManifest';

const WinBox = dynamic(() => import('react-winbox'), { ssr: false });

interface EnhancedWindowProps {
  windowId: string;
  appComponent: React.ComponentType<AppProps>;
  onClose: () => void;
}

export const EnhancedWindow: React.FC<EnhancedWindowProps> = ({
  windowId,
  appComponent: AppComponent,
  onClose
}) => {
  const dispatch = useDispatch();
  const windowState = useSelector((state: any) => state.windows.windows[windowId]);
  const windowService = WindowService.getInstance();
  const storageService = StorageService.getInstance();
  const fileSystemService = FileSystemService.getInstance();

  if (!windowState || !windowState.isVisible) {
    return null;
  }

  const systemAPI: SystemAPI = {
    filesystem: fileSystemService.createAPI(dispatch, () => ({ filesystem: {} })),
    storage: storageService.createAPI(dispatch, () => ({ storage: {} })),
    window: windowService.createAPI(windowId, dispatch, () => ({ windows: {} })),
    notifications: {
      show: async (notification) => {
        // Implementation for notifications
        return 'notification-id';
      },
      hide: (id) => {},
      clear: () => {}
    }
  };

  const customControls: WinBoxControlInfo[] = [
    {
      index: 420,
      class: "customMin",
      image: "https://i.imgur.com/0HMFmZ7.png",
      click: () => {
        dispatch(windowsSlice.actions.minimizeWindow(windowId));
      }
    }
  ];

  return (
    <WinBox
      key={windowId}
      id={windowId}
      title={windowState.title}
      width={windowState.size.width}
      height={windowState.size.height}
      x={windowState.position.x}
      y={windowState.position.y}
      icon={windowState.icon}
      hide={windowState.isMinimized}
      noFull={!windowState.isResizable}
      customControls={customControls}
      onClose={onClose}
      onFullscreen={() =>{console.log("fullscreen pressed");}}

      onMove={(x, y) => {
        dispatch(windowsSlice.actions.updateWindowPosition({
          windowId,
          position: { x, y }
        }));
      }}
      onResize={(width, height) => {
        dispatch(windowsSlice.actions.updateWindowSize({
          windowId,
          size: { width, height }
        }));
      }}
      onFocus={() => {
        dispatch(windowsSlice.actions.focusWindow(windowId));
      }}
    >
      <AppComponent
        windowId={windowId}
        api={systemAPI}
        onClose={onClose}
        onMinimize={() => dispatch(windowsSlice.actions.minimizeWindow(windowId))}
        onMaximize={() => dispatch(windowsSlice.actions.maximizeWindow(windowId))}
      />
    </WinBox>
  );
};

// Export actions
export const { 
  createWindow, 
  closeWindow, 
  minimizeWindow, 
  maximizeWindow, 
  restoreWindow, 
  focusWindow,
  updateWindowPosition,
  updateWindowSize,
  updateWindowTitle,
  updateWindowIcon
} = windowsSlice.actions;

export const { 
  setStorageItem, 
  removeStorageItem, 
  clearStorage 
} = storageSlice.actions;