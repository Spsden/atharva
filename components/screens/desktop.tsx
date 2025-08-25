import React, { Component,useState } from "react";
import ContentArea from "../parts/contentportion";
import Dock from "../parts/dock";
import BackgroundImage from "../utils/background";


function Desktop() {
  return (
    <div  overflow-hidden="true">
      <BackgroundImage />
      <div className="text-white">
        <ContentArea />
        <Dock />
      </div>
    </div>
  );
}

export default Desktop

