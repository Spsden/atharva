import { windowsSlice } from "../store/features/windows/windowsSlice";
import { WindowAPI, WindowEvent } from "../types/appManifest";
import { WindowState } from "../types/windows";

export class WindowService {
  private static instance: WindowService;
  private eventListeners: Map<string, Map<WindowEvent, ((data?: any) => void)[]>> = new Map();

  static getInstance(): WindowService {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService();
    }
    return WindowService.instance;
  }

  createAPI(windowId: string, dispatch: any, getState: any): WindowAPI {
    return {
      minimize: () => {
        dispatch(windowsSlice.actions.minimizeWindow(windowId));
        this.emit(windowId, 'minimize');
      },

      maximize: () => {
        dispatch(windowsSlice.actions.maximizeWindow(windowId));
        this.emit(windowId, 'maximize');
      },

      restore: () => {
        dispatch(windowsSlice.actions.restoreWindow(windowId));
        this.emit(windowId, 'restore');
      },

      close: () => {
        dispatch(windowsSlice.actions.closeWindow(windowId));
        this.emit(windowId, 'close');
        this.eventListeners.delete(windowId);
      },

      setTitle: (title: string) => {
        dispatch(windowsSlice.actions.updateWindowTitle({ windowId, title }));
      },

      setIcon: (icon: string) => {
        dispatch(windowsSlice.actions.updateWindowIcon({ windowId, icon }));
      },

      resize: (width: number, height: number) => {
        dispatch(windowsSlice.actions.updateWindowSize({ 
          windowId, 
          size: { width, height } 
        }));
        this.emit(windowId, 'resize', { width, height });
      },

      move: (x: number, y: number) => {
        dispatch(windowsSlice.actions.updateWindowPosition({ 
          windowId, 
          position: { x, y } 
        }));
        this.emit(windowId, 'move', { x, y });
      },

      focus: () => {
        dispatch(windowsSlice.actions.focusWindow(windowId));
        this.emit(windowId, 'focus');
      },

      getState: (): WindowState => {
        const state = getState();
        return state.windows.windows[windowId];
      },

      on: (event: WindowEvent, callback: (data?: any) => void) => {
        if (!this.eventListeners.has(windowId)) {
          this.eventListeners.set(windowId, new Map());
        }
        
        const windowListeners = this.eventListeners.get(windowId)!;
        if (!windowListeners.has(event)) {
          windowListeners.set(event, []);
        }
        
        windowListeners.get(event)!.push(callback);
      },

      off: (event: WindowEvent, callback: (data?: any) => void) => {
        const windowListeners = this.eventListeners.get(windowId);
        if (windowListeners?.has(event)) {
          const callbacks = windowListeners.get(event)!;
          const index = callbacks.indexOf(callback);
          if (index > -1) {
            callbacks.splice(index, 1);
          }
        }
      }
    };
  }

  private emit(windowId: string, event: WindowEvent, data?: any) {
    const windowListeners = this.eventListeners.get(windowId);
    if (windowListeners?.has(event)) {
      windowListeners.get(event)!.forEach(callback => callback(data));
    }
  }
}