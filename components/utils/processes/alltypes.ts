import { Interface } from "readline";
import { StartMenu } from "../../apps/startMenu/startMenu";
import TaskManager from "../../apps/taskManager";
import React, { ReactNode } from "react";

export type InstalledApps = {
  id: string;
  appPageUrl: string;
  title: string;
  type: string;
  icon: string;
  coreComponentId: number;
};

export const myMap = new Map<string, Function>([["taskmanager", TaskManager]]);

export const listOfFunctions: ((props: any) => JSX.Element)[] = [
  StartMenu,
  TaskManager,
];

export interface IconData {
  path: ReactNode;
  name: string;
}

export interface contextMenuItems {
  title:string;
  id:number;
}
