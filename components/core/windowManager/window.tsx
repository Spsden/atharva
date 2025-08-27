import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { WinBoxControlInfo } from "react-winbox";
import { useCloseCore } from "../../../hooks/closeStartHook";
import { listOfReactAppFunctions } from "../../../types/alltypes";

const WinBox = dynamic(() => import("react-winbox"), { ssr: false });

const Window = ({
  appPageUrl,
  title,
  id,
  icon,
  coreComponentId,
  type,
  closeCallBack,
  minMaxCallBack,
  currentState,
}: windowProps) => {
  const customMinimize: WinBoxControlInfo = {
    index: 420,
    class: "customMin",
    image: "https://i.imgur.com/0HMFmZ7.png",
    click: () => {
      console.log("Custom min tapped");
      minMaxCallBack()
    },
  };

  var appToShow;
  if (type == "coreApp") {
    appToShow = (
      <WinBox
        key={id}
        id={id}
        title={title}
        width="500"
        height={300}
        x="center"
        y={30}
        icon={icon}
        //noMin={true}
        noFull={true}
        customControls={[customMinimize]}
     
        onClose={() => {
          closeCallBack();
        }}
      >
        <AtharvaApp index={coreComponentId} />
      </WinBox>
    );

    return appToShow;
  }

  if (type == "core") {
    // console.log("incore");
    appToShow = <AtharvaApp index={coreComponentId} />;
    return appToShow;
  } else {
    //console.log("inthird");

    appToShow = (
      <WinBox
      hide={currentState}
        id={id}
        key={id}
        title={title}
        width="700"
        height={600}
        x="center"
        // onMinimize={() => console.log("heyyeye")}
        noMin={true}
        noFull={true}
        customControls={[customMinimize]}
        y={30}
        url={appPageUrl}
        icon={icon}
        onMinimize={() => {
          console.log();
        }}
        onClose={() => {
          closeCallBack();
        }}
      ></WinBox>
    );
    return appToShow;
  }

  //return appToShow;
};

export default Window;

function getFunction(index: number): (props: any) => JSX.Element {
  return listOfReactAppFunctions[index];
}

interface Props {
  index: number;
}

const AtharvaApp: React.FC<Props> = ({ index }) => {
  //const index = 0;
  const AppToLaunch = getFunction(index);


  return (
    // <div>
    //   <AppToLaunch/>
    // </div>

    <div className="h-12 to-blue-300">
      <AppToLaunch />
    </div>
  );
};

type windowProps = {
  appPageUrl: string;
  title: string;
  id: string;
  icon: string;
  coreComponentId: number;
  type: string;
  closeCallBack: Function;
  minMaxCallBack:Function;
  currentState:boolean
};
