import React from "react";
import { contextMenuItems } from "../utils/processes/alltypes";

const ContextMenuDialog = () => {
  return (
    <div style={{
      backdropFilter: "blur(20px)",
    }} className=" bg-stone-800/50  rounded-lg   drop-shadow-2xl w-48">
      {data.map((item : contextMenuItems ) => (
       <div>{item.title}</div>
      ))}
    </div>
  );
};



const ContextMenu = () => {
  return (
    <div
    onContextMenu={(e) => {
      e.preventDefault();
      console.log("Right Click", e.pageX, e.pageY);
    }}
    className="absolute left-0 right-0 top-0 bottom-0 z-50 "
  >
    <ContextMenuDialog/>
  </div>
  )
}

export default ContextMenu

  

export const data : contextMenuItems[]= [
  {
    id: 1,
    title: "Change Background",
  },
  {
    id: 2,
    title: "Terminal",
  },
];
