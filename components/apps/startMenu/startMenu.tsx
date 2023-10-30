import React, { useEffect, useState } from "react";
import StartProjectDescription from "./startProjectDes";
import { useCloseCore } from "../../../hooks/closeStartHook";
import { useTransition } from "react-transition-state";
import { Transition } from "@headlessui/react";

export const StartMenu = () => {
  const [currentProj, setcurrentProj] = useState<number>(0);
  const [coreStatus, handleCore] = useCloseCore();
  console.log("from startMenu function" ,coreStatus);

  const currentProjHandler = (index: number) => {
    setcurrentProj(index);
  };


  return (
    <Transition
    show={true}
    enter="transition-opacity duration-75"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    
    >
      <div
        style={{
          zIndex: "100",
          backdropFilter: "blur(70px)",
        }}
        className={`w-5/12 m-2 absolute  bottom-16 rounded-lg bg-stone-800/50 transition-height 
      }`}
      >
        <div className="w-2/5 float-left overflow-auto h-full">
          <div className="sticky top-0 bg-red-900  ">
            <h2>Projects</h2>
          </div>
          <ul className="">
            {allProjects.map(
              (
                item: {
                  id: string;
                  icon: string;
                  githubUrl: string;
                  title: string;
                  description: string;
                },
                i: number
              ) => (
                <li
                  key={i}
                  className="m-3 hover:bg-sky-700"
                  onClick={() => {
                    currentProjHandler(i);
                  }}
                >
                  <div className="flex space-x-2">
                    <img
                      className="h-10 rounded-lg"
                      src={item.icon}
                      alt="icon"
                    />
                    <p>{item.title}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <div className=" overflow-auto h-full  ">
          <StartProjectDescription {...allProjects[currentProj]} />
          {/* <div>{TechStackList[0].path}</div> */}
        </div>
      </div>
    </Transition>
  );
};

export interface Project {
  id: string;
  githubUrl: string;
  title: string;
  icon: string;
  techStack: TechStack[];
  description: string;
}

export type TechStack = {
  icon: string;
  name: string;
};

export let allProjects: Project[] = [
  {
    id: "1",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Drip",
    techStack: [
      { icon: "https://i.imgur.com/4LecXhX.png", name: "Android" },
      { icon: "https://i.imgur.com/sM3Ma6G.png", name: "Flutter" },
      { icon: "https://i.imgur.com/qTa6JPw.png", name: "Dart" },
      { icon: "https://i.imgur.com/7S0kNax.png", name: "Python" },
      {
        icon: "https://i.imgur.com/f1BGAXn.png",
        name: "Fluent design/ Windows",
      },
      { icon: "https://i.imgur.com/VCduROv.png", name: "C/C++" },
    ],
    icon: "https://i.imgur.com/L3Ip1wh.png",
    description: `Drip is a cross-platform youtube music client built using flutter. It has almost all features of Youtube music like music recommendation, search and playlist import. 
      Drip uses Microsoft's fluent design language. The backend is built using python and flask. `,
  },
  {
    id: "2",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Jott Notes",
    techStack: [
      { icon: "https://i.imgur.com/4LecXhX.png", name: "Android" },
      { icon: "some link", name: "Kotlin" },
      { icon: "some link", name: "Java" },
      { icon: "some link", name: "Material design" },
      { icon: "some link", name: "MVVM" },
      { icon: "some link", name: "Corout/ines" },
    ],
    icon: "https://i.imgur.com/p4vbIoE.png",
    description: `Jott notes is a Notes a android native app built using Kotlin and Xml Layouts. It uses MVVM architecture pattern along with room DB and coroutines. 
      It has features like markdown text, themeing, multimedia attachments and Text to speech. Material design shared transition animations have also been implemented. `,
  },
  {
    id: "3",
    githubUrl: "www.github.com/Spsden/drip",
    title: "RushApi",
    techStack: [],
    icon: "https://i.imgur.com/sLlB7Qj.png",
    description: "lorem ipsum RushApi",
  },
  {
    id: "4",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Obsy",
    techStack: [],
    icon: "https://i.imgur.com/nEgIj0U.png",
    description: "lorem ipsum Obsy",
  },
  {
    id: "5",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Daraz",
    techStack: [],
    icon: "https://i.imgur.com/L3Ip1wh.png",
    description: "lorem ipsum Daraz",
  },

  // {
  //   id: "1",
  //   githubUrl: "www.github.com/Spsden/drip",
  //   title: "Drip",
  //   techStack: [],
  //   icon: "https://i.imgur.com/L3Ip1wh.png",
  //   description: "lorem ipsum drip",
  // },
  // {
  //   id: "2",
  //   githubUrl: "www.github.com/Spsden/drip",
  //   title: "Jott Notes",
  //   techStack: [],
  //   icon: "https://i.imgur.com/p4vbIoE.png",
  //   description: "lorem ipsum Jott Notes",
  // },
  // {
  //   id: "3",
  //   githubUrl: "www.github.com/Spsden/drip",
  //   title: "RushApi",
  //   techStack: [],
  //   icon: "https://i.imgur.com/sLlB7Qj.png",
  //   description: "lorem ipsum RushApi",
  // },
  // {
  //   id: "4",
  //   githubUrl: "www.github.com/Spsden/drip",
  //   title: "Obsy",
  //   techStack: [],
  //   icon: "https://i.imgur.com/nEgIj0U.png",
  //   description: "lorem ipsum Obsy",
  // },
  // {
  //   id: "5",
  //   githubUrl: "www.github.com/Spsden/drip",
  //   title: "Daraz",
  //   techStack: [],
  //   icon: "https://i.imgur.com/L3Ip1wh.png",
  //   description: "lorem ipsum Daraz",
  // },
];
