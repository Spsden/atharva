import React from "react";

const TitleBar: React.FC<{ title: string }> = ({ title }) => {
  const handleClose = (e: any) => {
    
  };
  return (
    <div
      style={{
        backdropFilter: "blur(50px)",
      }}
      className="dragarea  w-full h-8 flex mb-5 justify-between  pl-2 bg-zinc-900   "
    >
      <div>
        <h3>{title}</h3>
      </div>
      <div className="">
        <button className="w-4 m-2 hover:bg-slate-700  align-middle">
          <img src="/assets/minimize.png" />
        </button>
        <button className="w-4 m-2  align-middle">
          <img src="/assets/maximize.png" />
        </button>
        <button
          onClick={(e) => {
            handleClose(e);
          }}
          className="w-4 m-2  align-middle"
        >
          <img src="/assets/close.png" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
