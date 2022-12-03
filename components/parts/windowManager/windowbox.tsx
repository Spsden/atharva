import React, { ReactElement } from "react";

export const TextComponent: React.FC<{ appUrl: string }> = ({
  appUrl,
}) => {
  return (
    <div className="h-full w-full flex flex-col bg-ub-cool-grey">
      <iframe
        src={appUrl}
        className="flex-grow"
        id="chrome-screen"
        frameBorder="0"
        title="Atharva browser"
      ></iframe>
    </div>
  );
};

export const Test2 = () => {
  return <div>Test2</div>;
};
