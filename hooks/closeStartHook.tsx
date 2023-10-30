import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeProcess } from "../components/utils/processes/store";

export const useCloseCore = () => {
  const [coreStatus, toggleCore] = useState<boolean>(false);
  const dispatch = useDispatch();

  function handleCore(status: boolean) {
    console.log("krlo print");
    if (coreStatus) {
      dispatch(removeProcess("start_process"));
    }
    toggleCore(status);
  }

  // handleCore()

  return [coreStatus, handleCore] as const;
};
