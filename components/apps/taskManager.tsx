import React from "react";
import {
  removeProcess,
  RootState,
  selectProcess,
} from "../utils/processes/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { Dolo } from "../parts/windowManager/window";
import { title } from "process";
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function TaskManager() {
  const allProcesses = useTypedSelector(selectProcess);
  return (
    <div>
      {allProcesses.map((process) => (
        <>
          <h2>{process.title}</h2>
          <p>{process.appPageUrl}{process.id}</p>
        </>
      ))}
    </div>
  );
}

export default TaskManager;
