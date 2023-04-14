import React from "react";

import { useCloseCore } from "../../hooks/closeStartHook";

export default function BackgroundImage() {
  const [coreStatus, handleCore] = useCloseCore();

  function lol() {}
  return (
    <div
      onClick={() => {
        console.log(coreStatus + "" + "yayyyyyy");

        // if(coreStatus){
        handleCore(true);

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
