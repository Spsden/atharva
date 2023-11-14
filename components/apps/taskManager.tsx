import React from "react";
// import { RootState, selectProcess } from "../utils/processes/store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootStates } from "../utils/reducers";

// const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function TaskManager() {
  const allProcesses = useSelector((state: RootStates) => state.processes.list);
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
    <div className="bg-white p-1 rounded-lg shadow-md m-2">
      <div className="flex justify-between items-center">
        <div>
          <img
            className="h-6 rounded-lg"
            src={processIcon}
            alt="Process Icon"
          />
        </div>
        <div>{processName}</div>
        <div>{processType}</div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            End
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
