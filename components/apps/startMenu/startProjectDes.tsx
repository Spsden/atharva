import React from "react";
import { allProjects, Project } from "./startMenu";
import Image from "next/image";

const StartProjectDescription = (props: Project) => {
  return (
    <div className="w-full p-4">
      <div className="h-16 flex justify-center align-middle">
        <img className="h-14" src={props.icon} />

        <div className="w-5"></div>

        <h1 className="text-2xl font-bold">{props.title}</h1>
      </div>
      <br />
      <br />
      <div className="self-start">
        <p className="text-lg font-bold">Description</p>
        <p>{props.description}</p>
      </div>

      <div>
        <br />

        <h2 className="text-lg font-bold">Tech Stack</h2>
        <ul className="">
          {props.techStack.map((item: {
            icon:string;
            name:string
          }, i: number) => (
            <li key={i} className="my-1.5 inline-block m-5"><div className="flex space-x-1.5 > * + *"><img src={item.icon} alt="NA" width={30} height={30}/> <p> {item.name}</p></div></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StartProjectDescription;
