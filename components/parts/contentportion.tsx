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
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          console.log("Right Click", e.pageX, e.pageY);
        }}
        className="absolute left-0 right-0 top-0 bottom-0 z-50 "
      >
        hhahahha
      </div>
      <div>
        {processes.map(
          (item: {
            id: string;
            appPageUrl: string;
            icon: string;
            type: string;
            title: string;
            coreComponentId: number;
          }) => (
            <Window
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
          )
        )}
      </div>
    </div>
  );
}

export default ContentArea;
