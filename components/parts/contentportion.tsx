import React from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

// import {
//   removeProcess,
//   RootState,
//   selectProcess,
// } from "../utils/processes/store";

import Window from "./windowManager/window";
import { StartMenu } from "../apps/startMenu/startMenu";
import { Transition } from "@headlessui/react";
import store, { RootState, RootStates } from "../utils/reducers";
import { removeProcess } from "../utils/reducers/processes";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
type contentAreaProps = {
  startState: boolean;
};
function ContentArea({ startState }: contentAreaProps) {
  const processes = useSelector((state: RootStates) => state.processes.list);

  // const processes = useSelector((state:any) => {
  //   return state.processes;
  // })
  const dispatch = useDispatch();

  function closeHandler(id: string) {
    console.log(id);

    dispatch(removeProcess(id));
  }

  // function hideHandler(id:string) {

  // }

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
        <StartMenu />
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
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContentArea;
