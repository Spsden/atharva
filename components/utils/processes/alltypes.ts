import TaskManager from "../../apps/taskManager";

export type InstalledApps = {
  id: string;
  appPageUrl: string;
  title: string;
  type:string;
  icon: string;
  coreComponentId: string;
};

let myMap = new Map<string, Function>([
  ["taskmanager", TaskManager],

]);



