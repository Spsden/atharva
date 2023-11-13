import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addProcess, removeProcess } from "../components/utils/processes/store";
import { InstalledApps } from "../components/utils/processes/alltypes";

export const useCloseCore = ()  => {
  const [coreStatus, toggleCore] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  function handleCore(status: boolean,coreApp:InstalledApps) {
    if (coreStatus) {
      dispatch(removeProcess(coreApp.id));
     //// toggleCore(false)
    } else{
      dispatch(addProcess(coreApp))
     // toggleCore(true)

    }
    toggleCore(status);
  }
  console.log(coreStatus,"from here")

  // handleCore()

  return [coreStatus, handleCore] as const;
};








// export const useCoreAppSwitch = (initValue:boolean = false)  => {
//   const [coreStatus, toggleCore] = useState<boolean>(initValue);
//   const dispatch = useDispatch();

//   function handleCore(status: boolean,coreApp:InstalledApps) {
//     if (coreStatus) {
//       dispatch(removeProcess(coreApp.id));
//     } else{
//       dispatch(addProcess(coreApp))
//     }
//     toggleCore(!coreStatus);
//   }

//   // handleCore()

//   return [coreStatus, handleCore] as const;
// };
