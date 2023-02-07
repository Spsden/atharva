import React from "react";

import dynamic from "next/dynamic";
import { listOfFunctions, myMap } from "../../utils/processes/alltypes";
const WinBox = dynamic(() => import("react-winbox"), { ssr: false });

const Window = ({
  appPageUrl,
  title,
  id,
  icon,
  coreComponentId,
  type,
  closeCallBack,
}: {
  appPageUrl: string;
  title: string;
  id: string;
  icon: string;
  coreComponentId: number;
  type: string;
  closeCallBack: Function;
}) => {
  function closeHandler() {}

  console.log(type);

  var appToShow;
  if (type == "coreApp") {
    console.log("incoreApp");

    appToShow = (
      <WinBox
        id={id}
        title={title}
        width="500"
        height={300}
        x="center"
        y={30}
        icon={icon}
        onClose={() => {
          closeCallBack();
        }}
      >
        <ComponentA index={coreComponentId} />
      </WinBox>
    );

    return appToShow;
  }

  if (type == "core") {
    console.log("incore");
    appToShow = <ComponentA index={coreComponentId} />;
    return appToShow;
  } else {
    console.log("inthird");

    appToShow = (
      <WinBox
        id={id}
        title={title}
        width="500"
        height={300}
        x="center"
        y={30}
        url={appPageUrl}
        icon={icon}
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

// export const Dolo = ({ id }: { id: string }) => {
//   return (
//     <div>
//       <TaskManager />
//     </div>
//   );
// };

function getFunction(index: number): (props: any) => JSX.Element {
  return listOfFunctions[index];
}

interface Props {
  index: number;
}

const ComponentA: React.FC<Props> = ({ index }) => {
  //const index = 0;
  const SelectedFunction = getFunction(index);

  return (
    <div>
      <SelectedFunction />
    </div>
  );
};
