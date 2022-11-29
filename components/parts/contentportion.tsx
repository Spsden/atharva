import React from "react";
import Window from "./windowManager/window";
import { TextComponent } from "./windowManager/windowbox";

interface ContentAreaProps {
  aWindow?: React.ReactNode;
  title: string
}


function ContentArea() {
  return (
    <div>
      <Window title={"Drip Player"} ChildComp={TextComponent} />
    </div>
  );
}

export default ContentArea;
