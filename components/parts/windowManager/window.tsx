
import React, { Component, ReactNode } from "react";
import { Rnd } from "react-rnd";
import TitleBar from "../windowManager/titlebar";
import { TextComponent } from "./windowbox";


const Window = ({
  appPageUrl,
  title,
  id,
}:{appPageUrl:string,title:string,id:string}) => {
  return (
    <Rnd
      className="lex align-center justify-center border-red-700"
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
          contain: "strict",
          overflow: "hidden",
        }}
        className="flex flex-col border-neutral-300 h-full w-full rounded-xl "
      >
        <TitleBar title={title} id={id} />
        <TextComponent appUrl={appPageUrl}/>
      </div>
    </Rnd>
  );
};

export default Window;

export const Dolo = () => {
  return <div>Dolo</div>;
};

// export default class Window extends Component {
//   xPos: number;
//   yPos: number;
//   width: string;
//   height: string;
//   childComp: FunctionComponent;

//   constructor(
//     props: {},
//     x: number,
//     y: number,
//     width: string,
//     height: string,
//     childComp: FunctionComponent
//   ) {
//     super(props);
//     this.xPos = x;
//     this.yPos = y;
//     this.width = width;
//     this.height = height;
//     this.childComp = childComp;
//   }
//   render() {
//     return (
//       <div>

//         <section>
//           <p>
//             The World Wide Fund for Nature (WWF) is an international
//             organization working on issues regarding the conservation, research
//             and restoration of the environment, formerly named the World
//             Wildlife Fund. WWF was founded in 1961.
//           </p>

//         </section>
//         <div>{<>{this.childComp}</>}</div>
//       </div>
//     );
//   }
// }
