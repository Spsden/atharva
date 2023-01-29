import React from "react";
import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux";
import WinContainer from "./windowManager/winbox";
import { removeProcess, RootState, selectProcess } from "../utils/processes/store";
import Window from "./windowManager/window";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function ContentArea() {
  const processes = useTypedSelector(selectProcess);
  const dispatch = useDispatch()

  function closeHandler(id:string) {
    console.log(id)
      
    dispatch(removeProcess(id));
      
  }

  return (   
    <div>
      {processes.map(
        (item: {
          id: string;
          appPageUrl: string;
          icon: string;
          type:string;
          title: string;
          coreComponentId:string

        }) => (
          <Window
            appPageUrl={item.appPageUrl}
            title={item.title}
            id={item.id}
            icon={item.icon}
            coreComponentId={item.coreComponentId}
            type={item.type}

            closeCallBack={()=>{
              closeHandler(item.id)
            }}
          />
        )
      )}
    </div>
  );
}

export default ContentArea;
