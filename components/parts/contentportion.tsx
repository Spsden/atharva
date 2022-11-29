import React from "react";
import { Rnd } from "react-rnd";
import TitleBar from "./windowManager/titlebar";

function ContentArea() {
  return (
    <Rnd
      className="lex align-center justify-center border-red-700 "
      default={{
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      }}
      dragHandleClassName="dragarea"
    >
      <div
        style={{
          backdropFilter: "blur(30px)",
          margin: "10px",
          right: "5px",
          left: "5px",
          border: "solid black",
        }}
        className="flex flex-col border-neutral-300 h-full w-full"
      >
        <TitleBar />
        <div className="h-full w-full">
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printeitnc
        </div>
      </div>
    </Rnd>
  );
}

export default ContentArea;
