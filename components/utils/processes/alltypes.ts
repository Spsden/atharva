import { StartMenu } from "../../apps/startMenu";
import TaskManager from "../../apps/taskManager";

export type InstalledApps = {
  id: string;
  appPageUrl: string;
  title: string;
  type:string;
  icon: string;
  coreComponentId: number;
};

export const myMap = new Map<string, Function>([
  ["taskmanager", TaskManager],

]);

export const listOfFunctions: ((props: any) => JSX.Element)[] = [
  StartMenu,
  TaskManager,
];


