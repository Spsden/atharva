import React, { useEffect, useState } from "react";
import { contextMenuItems } from "../utils/processes/alltypes";

const ContextMenuDialog = (props: { x: number; y: number }) => {
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        top:props.x,
        left:props.y
        
        
        
      } }
      // className= {" bg-stone-800/50  rounded-lg   drop-shadow-2xl w-48 top-" + props.x+" left-" + props.y}
      className= {" bg-stone-800/50  rounded-lg   drop-shadow-2xl w-48 absolute box-border"}
    >
      <p>{props.x}</p>
      {data.map((item: contextMenuItems) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
};

const ContextMenu = () => {
  const [clicked, setClicked] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClick = () => setClicked(false);

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setClicked(true);
        setCoordinates({
          x: e.pageX,
          y: e.pageY,
        });
        console.log("Right Click", e.pageX, e.pageY);
      }}
      className="absolute left-0 right-0 top-0 bottom-0 z-50 "
    >

      {/* <div style={{
        width:100,
        height:50,
        position:"absolute",
        top:coordinates.x,
        left:coordinates.y
      }}>Hhahahahahhahahaha</div> */}
      { <ContextMenuDialog x={coordinates.x} y={coordinates.y} />}
    </div>
  );
};

export default ContextMenu;

export const data: contextMenuItems[] = [
  {
    id: 1,
    title: "Change Background",
  },
  {
    id: 2,
    title: "Terminal",
  },
];
