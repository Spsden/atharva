import React from "react";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import {
  removeProcess,
  RootState,
  selectProcess,
} from "../utils/processes/store";
import Window from "./windowManager/window";
import ContextMenu from "./contextMenu";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function ContentArea() {
  const processes = useTypedSelector(selectProcess);
  const dispatch = useDispatch();

  function closeHandler(id: string) {
    console.log(id);

    dispatch(removeProcess(id));
  }

  return (
    <div>
      {/* <ContextMenu /> */}

      <div>
        <ul>
          {processes.map((item) => (
            <li key={item.id}>
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
