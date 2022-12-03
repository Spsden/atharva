import React from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {} from "../utils/processes/alltypes";
import { RootState, selectProcess } from "../utils/processes/store";
import Window from "./windowManager/window";
import { TextComponent } from "./windowManager/windowbox";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function ContentArea() {
  const processes = useTypedSelector(selectProcess);
  // console.log(processes[0]);
  // console.log("heheh");
  // const x:string = processes[0].appPageUrl
  //  const fcComp = selector.

  return (
    <div>
      {/* <Window title={"Photopea"} appPageUrl={processes[0].appPageUrl}  />
      <Window title={"Photopea"} appPageUrl="https://www.photopea.com/"  />
       */}

      {processes.map(
        (item: {
          id: number;
          appPageUrl: string;
          icon: string;
          title: string;
        }) => (
          <Window appPageUrl={item.appPageUrl} title={item.title} />
        )
      )}
    </div>
  );
}

export default ContentArea;
