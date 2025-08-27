export interface WindowState {
  windowId: string;
  processId: string;
  appId: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isVisible: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isResizable: boolean;
  isMovable: boolean;
}

export interface WindowsState {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  nextZIndex: number;
}