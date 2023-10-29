import React from "react";
import { RootState, selectProcess } from "../utils/processes/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function TaskManager() {
  const allProcesses = useTypedSelector(selectProcess);
  return (
    <div>
      <ul>
        {allProcesses.map((process) => (
          <li>
            <TaskCard
              processID={process.id}
              processIcon={process.icon}
              processName={process.title}
              processType={process.type}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface processParams {
  processIcon: string;
  processName: string;
  processType: string;
  processID: string;
}

function TaskCard({
  processIcon,
  processName,
  processType,
  processID,
}: processParams) {
  return (
    <div>
      <div>{processIcon}</div>
      <div>{processName}</div>
      <div>{processType}</div>
      <div>
        <button>End</button>
      </div>
    </div>
  );
}

export default TaskManager;
