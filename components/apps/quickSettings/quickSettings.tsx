import React, { useState } from "react";

const QuickSettingsMenu = () => {
  return (
    <div
      style={{
        zIndex: "100",

        backdropFilter: "blur(70px)",
      }}
      className={`w-1/4 h-3/6 m-2 absolute p-4  bottom-16 rounded-lg bg-stone-800/50  right-[3px]
  }`}
    >
      <div className="grid grid-cols-3 gap-4">
        <SettingOptionButton settingName="Wifi" />
        <SettingOptionButton settingName="Bluetooth"/>

        <SettingOptionButton settingName="Flight Mode"/>

        <SettingOptionButton settingName="Night light"/>

        <SettingOptionButton settingName="theme"/>
        <SettingOptionButton settingName="Flight mode"/>
      </div>
      <div>
        <Slider sliderName="Volume" />
        <Slider sliderName="Brightness" />
      </div>
      <div className="">

      </div>
    </div>
  );
};

interface sliderProps {
  sliderName: string;
}

const Slider = ({ sliderName }: sliderProps) => {
  return (
    <div className="mb-2">
      
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {sliderName}
      </label>
      <input
        id="default-range"
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      ></input>
    </div>
  );
};

interface settingOptionButtonProps {
  settingName :string
}

const SettingOptionButton = ({settingName}:settingOptionButtonProps) => {
  const [wifiStatus, setWifiStatus] = useState(false);

  const toggleWifi = () => {
    //   setWifiStatus((prevStatus) => !prevStatus);
  };
  return (
    <div className="">
      <button
        className={`flex items-center p-2 rounded-full w-full h-14 ${
          wifiStatus ? "bg-blue-500" : "bg-gray-300"
        } text-white focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300`}
        onClick={toggleWifi}
      >{settingName}</button>
      
    </div>
  );
};

export default QuickSettingsMenu;
