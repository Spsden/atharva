import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState, selectProcess } from "../utils/processes/store";
import Window from "./windowManager/window";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function ContentArea() {
  const processes = useTypedSelector(selectProcess);

  return (
    <div>
      {processes.map(
        (item: {
          id: string;
          appPageUrl: string;
          icon: string;
          title: string;
        }) => (
          <Window
            appPageUrl={item.appPageUrl}
            title={item.title}
            id={item.id}
          />
        )
      )}
    </div>
  );
}

export default ContentArea;
