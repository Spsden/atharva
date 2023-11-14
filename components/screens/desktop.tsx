import React, { Component,useState } from "react";
import ContentArea from "../parts/contentportion";
import Dock from "../parts/dock";
import BackgroundImage from "../utils/background";


function Desktop() {

  const [start, setstart] = useState(false)

  const handleStart = () => {
    console.log("start clciked", start)
    setstart(!start);
  }
  const closeStart = () => {
    setstart(false)
  }
  return (
    <div  overflow-hidden="true">
      <BackgroundImage />
      <div className="text-white">
        <ContentArea startToggle={closeStart} startState={start} />
        <Dock starStateCallBack={handleStart}/>
      </div>
    </div>
  );
}

export default Desktop

