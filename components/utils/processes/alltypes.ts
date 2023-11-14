import { Interface } from "readline";
import { StartMenu } from "../../apps/startMenu/startMenu";
import TaskManager from "../../apps/taskManager";
import React, { ReactNode } from "react";

export enum windowStates {
  MINIMIZED,
  MAXIMIZED,
  OPEN,
}

export interface InstalledAppsWithState extends InstalledApps {
  currentState: windowStates;
}

export type InstalledApps = {
  id: string;
  appPageUrl: string;
  title: string;
  type: string;
  icon: string;
  ref?: React.RefObject<any>;
  coreComponentId: number;
};

export const myMap = new Map<string, Function>([["taskmanager", TaskManager]]);

//These are coreApps which are not launched
//from URL using any link. These are part of
//of the app. located in the apps folder.
export const listOfReactAppFunctions: ((props: any) => JSX.Element)[] = [
  StartMenu,
  TaskManager,
];

export interface IconData {
  path: ReactNode;
  name: string;
}

export interface contextMenuItems {
  title: string;
  id: number;
}
