import React, { useState, useRef } from "react";
import { Transition } from "@headlessui/react";
import StartProjectDescription from "./startProjectDes";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeStartMenu } from "../../../store/features/ui/uiSlice";
import { RootState } from "../../../store/store";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

export const StartMenu = () => {
  const [currentProj, setcurrentProj] = useState<number>(0);
  const { isStartMenuOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);
 useOnClickOutside(ref, (event) => {
    const startButton = document.getElementById('start-button');
    if (startButton && (startButton.contains(event.target) || startButton === event.target)) {
      return; 
    }
    dispatch(closeStartMenu());
  });

  const currentProjHandler = (index: number) => {
    setcurrentProj(index);
  };

  return (
    <Transition
      show={isStartMenuOpen}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={ref}
        style={{
          zIndex: "100",
          backdropFilter: "blur(70px)",
        }}
        className={`w-5/12 h-4/6 m-2 absolute  bottom-16 rounded-lg bg-stone-800/50 
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
                    <Image
                      width={40}
                      height={40}
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
      { icon: "/assets/tech_stack_icons/android-icon.png", name: "Android" },
      { icon: "/assets/tech_stack_icons/flutter.png", name: "Flutter" },
      { icon: "/assets/tech_stack_icons/dart.png", name: "Dart" },
      { icon: "/assets/tech_stack_icons/python.png", name: "Python" },
      {
        icon: "/assets/tech_stack_icons/microsoft-windows.png",
        name: "Fluent design/ Windows",
      },
      { icon: "/assets/app_icons/dddd.png", name: "C/C++" },
    ],
    icon: "/assets/app_icons/dddd.png",
    description: `Drip is a cross-platform youtube music client built using flutter. It has almost all features of Youtube music like music recommendation, search and playlist import. 
      Drip uses Microsoft's fluent design language. The backend is built using python and flask. `,
  },
  {
    id: "2",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Jott Notes",
    techStack: [
      { icon: "/assets/tech_stack_icons/android-icon.png", name: "Android" },
      { icon: "/assets/app_icons/dddd.png", name: "Kotlin" },
      { icon: "/assets/app_icons/dddd.png", name: "Java" },
      { icon: "/assets/app_icons/dddd.png", name: "Material design" },
      { icon: "/assets/app_icons/dddd.png", name: "MVVM" },
      { icon: "/assets/app_icons/dddd.png", name: "Coroutines" },
    ],
    icon: "/assets/app_icons/dddd.png",
    description: `Jott notes is a Notes a android native app built using Kotlin and Xml Layouts. It uses MVVM architecture pattern along with room DB and coroutines. 
      It has features like markdown text, themeing, multimedia attachments and Text to speech. Material design shared transition animations have also been implemented. `,
  },
  {
    id: "3",
    githubUrl: "www.github.com/Spsden/drip",
    title: "RushApi",
    techStack: [],
    icon: "/assets/app_icons/dddd.png",
    description: "lorem ipsum RushApi",
  },
  {
    id: "4",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Obsy",
    techStack: [],
    icon: "/assets/app_icons/dddd.png",
    description: "lorem ipsum Obsy",
  },
  {
    id: "5",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Daraz",
    techStack: [],
    icon: "/assets/app_icons/dddd.png",
    description: "lorem ipsum Daraz",
  },
];

export default StartMenu;