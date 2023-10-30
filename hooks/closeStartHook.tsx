import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProcess, removeProcess } from "../components/utils/processes/store";
import { InstalledApps } from "../components/utils/processes/alltypes";

export const useCloseCore = ()  => {
  const [coreStatus, toggleCore] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleCore(status: boolean,coreApp:InstalledApps) {
    console.log("krlo print");
    if (coreStatus) {
      dispatch(removeProcess(coreApp.id));
    } else{
      dispatch(addProcess(coreApp))
    }
    toggleCore(status);
  }

  // handleCore()

  return [coreStatus, handleCore] as const;
};
