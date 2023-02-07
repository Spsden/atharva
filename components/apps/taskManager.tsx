import React from "react";
import { RootState, selectProcess } from "../utils/processes/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function TaskManager() {
  const allProcesses = useTypedSelector(selectProcess);
  return (
    <div>
      {allProcesses.map((process) => (
        <>
          <h2>{process.title}</h2>
          <p>{process.appPageUrl}</p>
          <br />
          <p>{process.id}</p>
          <br />
        </>
      ))}
    </div>
  );
}

export default TaskManager;
