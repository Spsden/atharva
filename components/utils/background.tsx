import React from "react";

import { useCloseCore } from "../../hooks/closeStartHook";
import { InstalledApps } from "./processes/alltypes";

const start: InstalledApps = {
  id: "start_process",
  icon: "https://i.imgur.com/20NiE9m.png",
  title: "start",
  type: "core",
  coreComponentId: 0,
  appPageUrl: "http://www.google.com/",
};

export default function BackgroundImage() {
  //function lol() {}
  return (
    <div
      onClick={() => {
        // if(coreStatus){
        // handleCore(true,start);
        //}
      }}
      style={{
        backgroundImage: `url('./assets/walle.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundSize: "cover",
      }}
      className=" absolute -z-10 top-0 right-0 overflow-hidden h-full w-full"
    >
      {/* <Image 
        className={"z-0 "}
        src = {wallpaper}
        alt = "wallpaer here"
        layout='fill'
        objectFit='cover'
        objectPosition='cover' */}
    </div>
  );
}
