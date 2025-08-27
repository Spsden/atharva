import React, { useRef, useState, useCallback, useEffect } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { windowsSlice } from '../../store/features/windows/windowsSlice';
import { WindowService } from '../../services/WindowService';
import { StorageService } from '../../services/StorageService';
import { FileSystemService } from '../../services/FileSystemService';
import { AppProps, SystemAPI } from '../../types/appManifest';

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
  
  const nodeRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState("cursor-default");
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const updateBoundaries = () => {
      const width = window.innerWidth - (window.innerWidth * (windowState.size.width / window.innerWidth));
      const height = window.innerHeight - (window.innerHeight * (windowState.size.height / window.innerHeight)) - 28;
      setParentSize({ width, height });
    };

    updateBoundaries();
    window.addEventListener('resize', updateBoundaries);
    
    return () => {
      window.removeEventListener('resize', updateBoundaries);
    };
  }, [windowState.size]);

  if (!windowState || !windowState.isVisible) {
    return null;
  }

  const systemAPI: SystemAPI = {
    filesystem: fileSystemService.createAPI(dispatch, () => ({ filesystem: {} })),
    storage: storageService.createAPI(dispatch, () => ({ storage: {} })),
    window: windowService.createAPI(windowId, dispatch, () => ({ windows: {} })),
    notifications: {
      show: async (notification) => {
        return 'notification-id';
      },
      hide: (id) => {},
      clear: () => {}
    }
  };

  const handleDragStart = useCallback(() => {
    setCursorType("cursor-move");
    dispatch(windowsSlice.actions.focusWindow(windowId));
    
    if (windowState.isMaximized) {
      dispatch(windowsSlice.actions.restoreWindow(windowId));
    }
  }, [dispatch, windowId, windowState.isMaximized]);

  const handleDragStop = useCallback(() => {
    setCursorType("cursor-default");
  }, []);

  const handleDrag = useCallback((e: DraggableEvent, data: DraggableData) => {
    dispatch(windowsSlice.actions.updateWindowPosition({
      windowId,
      position: { x: data.x, y: data.y }
    }));
  }, [dispatch, windowId]);

  const handleMinimize = useCallback(() => {
    dispatch(windowsSlice.actions.minimizeWindow(windowId));
  }, [dispatch, windowId]);

  const handleMaximize = useCallback(() => {
    if (windowState.isMaximized) {
      dispatch(windowsSlice.actions.restoreWindow(windowId));
    } else {
      dispatch(windowsSlice.actions.maximizeWindow(windowId));
    }
  }, [dispatch, windowId, windowState.isMaximized]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleResize = useCallback((direction: 'horizontal' | 'vertical') => {
    if (!windowState.isResizable) return;
    
    const increment = 10;
    const currentSize = windowState.size;
    
    if (direction === 'horizontal') {
      dispatch(windowsSlice.actions.updateWindowSize({
        windowId,
        size: {
          width: currentSize.width + increment,
          height: currentSize.height
        }
      }));
    } else {
      dispatch(windowsSlice.actions.updateWindowSize({
        windowId,
        size: {
          width: currentSize.width,
          height: currentSize.height + increment
        }
      }));
    }
  }, [dispatch, windowId, windowState.size, windowState.isResizable]);

  const windowClasses = [
    cursorType,
    windowState.isMaximized ? "duration-300 rounded-none" : "rounded-lg rounded-b-none",
    windowState.isMinimized ? "opacity-0 invisible duration-200" : "",
    windowState.isFocused ? "z-30" : "z-20 notFocused",
    "opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute window-shadow",
    "border-black border-opacity-40 border border-t-0 flex flex-col bg-white"
  ].filter(Boolean).join(" ");

  const windowStyle: React.CSSProperties = windowState.isMaximized 
    ? { width: '100vw', height: '100vh' }
    : { width: windowState.size.width, height: windowState.size.height };

  const defaultPosition = windowState.isMaximized 
    ? { x: 0, y: 0 }
    : { x: windowState.position.x, y: windowState.position.y };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="both"
      handle=".window-title-bar"
      grid={[1, 1]}
      scale={1}
      onStart={handleDragStart}
      onStop={handleDragStop}
      onDrag={handleDrag}
      allowAnyClick={false}
      position={defaultPosition}
      bounds={{
        left: 0,
        top: 0,
        right: parentSize.width,
        bottom: parentSize.height
      }}
      disabled={windowState.isMaximized}
    >
      <div
        ref={nodeRef}
        style={windowStyle}
        className={windowClasses}
        id={windowId}
        onClick={() => dispatch(windowsSlice.actions.focusWindow(windowId))}
      >
        {/* Resize borders */}
        {windowState.isResizable && !windowState.isMaximized && (
          <>
            <WindowYBorder onResize={() => handleResize('horizontal')} />
            <WindowXBorder onResize={() => handleResize('vertical')} />
          </>
        )}
        
        {/* Title bar */}
        <WindowTitleBar 
          title={windowState.title} 
          icon={windowState.icon}
        />
        
        {/* Window controls */}
        <WindowControls
          windowId={windowId}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
          isMaximized={windowState.isMaximized}
        />

        {/* Main content */}
        <WindowMainScreen>
          <AppComponent
            windowId={windowId}
            api={systemAPI}
            onClose={onClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
          />
        </WindowMainScreen>
      </div>
    </Draggable>
  );
};

// Window Title Bar Component
interface WindowTitleBarProps {
  title: string;
  icon?: string;
}

const WindowTitleBar: React.FC<WindowTitleBarProps> = ({ title, icon }) => {
  return (
    <div className="window-title-bar relative bg-gray-800 border-t-2 border-white border-opacity-5 py-1.5 px-3 text-white w-full select-none rounded-b-none">
      <div className="flex justify-center items-center text-sm font-bold">
        {icon && (
          <img 
            src={icon} 
            alt="" 
            className="w-4 h-4 mr-2"
          />
        )}
        {title}
      </div>
    </div>
  );
};

// Window Controls Component
interface WindowControlsProps {
  windowId: string;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  isMaximized: boolean;
}

const WindowControls: React.FC<WindowControlsProps> = ({
  windowId,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized
}) => {
  return (
    <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
      <span 
        className="mx-1.5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center cursor-pointer"
        onClick={onMinimize}
      >
        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </span>
      
      <span 
        className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center cursor-pointer"
        onClick={onMaximize}
      >
        {isMaximized ? (
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 000 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      
      <button
        tabIndex={-1}
        id={`close-${windowId}`}
        className="mx-1.5 focus:outline-none cursor-pointer bg-red-500 bg-opacity-90 hover:bg-opacity-100 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={onClose}
      >
        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Window Resize Borders
interface WindowBorderProps {
  onResize: () => void;
}

const WindowYBorder: React.FC<WindowBorderProps> = ({ onResize }) => {
  const transparentImage = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    transparentImage.current = new Image(0, 0);
    transparentImage.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    transparentImage.current.style.opacity = '0';
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    if (transparentImage.current) {
      e.dataTransfer.setDragImage(transparentImage.current, 0, 0);
    }
  };

  return (
    <div 
      className="window-y-border border-transparent border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 cursor-ns-resize"
      draggable
      onDragStart={handleDragStart}
      onDrag={onResize}
    />
  );
};

const WindowXBorder: React.FC<WindowBorderProps> = ({ onResize }) => {
  const transparentImage = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    transparentImage.current = new Image(0, 0);
    transparentImage.current.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    transparentImage.current.style.opacity = '0';
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    if (transparentImage.current) {
      e.dataTransfer.setDragImage(transparentImage.current, 0, 0);
    }
  };

  return (
    <div 
      className="window-x-border border-transparent border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-1 cursor-ew-resize"
      draggable
      onDragStart={handleDragStart}
      onDrag={onResize}
    />
  );
};

// Window Main Screen
interface WindowMainScreenProps {
  children: React.ReactNode;
}

const WindowMainScreen: React.FC<WindowMainScreenProps> = ({ children }) => {
  const [darkBg, setDarkBg] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDarkBg(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full flex-grow z-20 max-h-full overflow-y-auto transition-colors duration-300 ${
      darkBg ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {children}
    </div>
  );
};