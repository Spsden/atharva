import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Window from "./windowManager/window";
import { StartMenu } from "../apps/startMenu/startMenu";
import { Transition } from "@headlessui/react";
import {  RootStates } from "../utils/reducers";
import { removeProcess } from "../utils/reducers/processes";
import { removeFromProcessStates, setMinimize } from "../utils/reducers/process_state";
import QuickSettingsMenu from "../apps/quickSettings/quickSettings";

type contentAreaProps = {
  startState: boolean;
  startToggle: () =>void
};
function ContentArea({ startState,startToggle }: contentAreaProps) {
  const processes = useSelector((state: RootStates) => state.processes.list);
  const processState = useSelector((state: RootStates) => state.windowStates);
  console.log(processState);

  const dispatch = useDispatch();

  function closeHandler(id: string) {
    console.log(id);

    dispatch(removeProcess(id));
    dispatch(removeFromProcessStates({processID:id}))
  }

  function minMaxHandler(processID: string) {
    dispatch(setMinimize({ processID: processID }));
  }

  const isAppMinimized = (processID: string): boolean => {
    const windowState = processState.list.find(
      (state) => state.processID === processID
    );
    return windowState?.isMinimized ?? false;
  };

  return (
    <div>
      {/* <ContextMenu /> */}

      <Transition
        show={startState}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <StartMenu  closeToggle={startToggle}/>


      </Transition>

      <div>
        <ul>
          {processes.map((item, i) => (
            <li key={i}>
              <Window
                key={item.id}
                appPageUrl={item.appPageUrl}
                title={item.title}
                id={item.id}
                icon={item.icon}
                coreComponentId={item.coreComponentId}
                type={item.type}
                closeCallBack={() => {
                  closeHandler(item.id);
                }}
                minMaxCallBack={() => {
                  minMaxHandler(item.id);
                }}
                currentState={isAppMinimized(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <QuickSettingsMenu/>
    </div>
  );
}

export default ContentArea;
