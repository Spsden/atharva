import { FileSystemNode } from "./fileSystem";
import { WindowState } from "./windows";

export interface AppManifest {
  id: string;
  name: string;
  version: string;
  icon: string;
  description: string;
  type: 'core' | 'dynamic';
  main: string; 
  dependencies?: string[];
  minSystemVersion?: string;
  defaultWindow?: {
    width: number;
    height: number;
    resizable?: boolean;
    movable?: boolean;
    minimizable?: boolean;
    maximizable?: boolean;
  };
}

export interface DynamicApp {
  manifest: AppManifest;
component: React.ComponentType<AppProps>;
  isLoaded: boolean;
  bundle?: string; 
}

export interface AppProps {
  windowId: string;
  api: SystemAPI;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
}

// System API that apps can use
export interface SystemAPI {
  filesystem: FileSystemAPI;
  notifications: NotificationAPI;
  storage: StorageAPI;
  window: WindowAPI;
}

export interface FileSystemAPI {
  readFile: (path: string) => Promise<string | Uint8Array>;
  writeFile: (path: string, content: string | Uint8Array) => Promise<void>;
  createFolder: (path: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  listDirectory: (path: string) => Promise<FileSystemNode[]>;
  exists: (path: string) => Promise<boolean>;
  getStats: (path: string) => Promise<FileSystemNode>;
}

export interface StorageAPI {
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<void>;
  remove: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  keys: () => Promise<string[]>;
  getSize: () => Promise<number>;
}


export interface WindowAPI {
  minimize: () => void;
  maximize: () => void;
  restore: () => void;
  close: () => void;
  setTitle: (title: string) => void;
  setIcon: (icon: string) => void;
  resize: (width: number, height: number) => void;
  move: (x: number, y: number) => void;
  focus: () => void;
  getState: () => WindowState;
  on: (event: WindowEvent, callback: (data?: any) => void) => void;
  off: (event: WindowEvent, callback: (data?: any) => void) => void;
}

export interface NotificationAPI {
  show: (notification: NotificationOptions) => Promise<string>;
  hide: (id: string) => void;
  clear: () => void;
}


export interface NotificationAction {
  label: string;
  action: () => void;
}


export type WindowEvent = 'minimize' | 'maximize' | 'restore' | 'close' | 'focus' | 'blur' | 'resize' | 'move';
