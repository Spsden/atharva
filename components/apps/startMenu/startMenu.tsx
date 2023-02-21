import React, { useState } from "react";

export let allProjects: Project[] = [
  {
    id: "1",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Drip",
    icon: "https://i.imgur.com/L3Ip1wh.png",
    description: "lorem ipsum drip",
  },
  {
    id: "2",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Jott Notes",
    icon: "https://i.imgur.com/p4vbIoE.png",
    description: "lorem ipsum Jott Notes",
  },
  {
    id: "3",
    githubUrl: "www.github.com/Spsden/drip",
    title: "RushApi",
    icon: "https://i.imgur.com/sLlB7Qj.png",
    description: "lorem ipsum RushApi",
  },
  {
    id: "4",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Obsy",
    icon: "https://i.imgur.com/nEgIj0U.png",
    description: "lorem ipsum Obsy",
  },
  {
    id: "5",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Daraz",
    icon: "https://i.imgur.com/L3Ip1wh.png",
    description: "lorem ipsum Daraz",
  },
];

export const StartMenu = () => {

  const [currentDes,setcurrentDes]  = useState<string>("")

  const descriptionHandler =(desc:string) => {
    setcurrentDes(desc)
    
  }
  return (
    <div
      style={{
        backdropFilter: "blur(70px)",
      }}
      className="w-5/12 h-4/6 m-2 absolute  overflow-y-auto  bottom-16 rounded-lg "
    >
      <div className="grid grid-cols-2  gap-4">
        <div className="">
          <div className="sticky top-0 bg-red-900 ">
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
                  description:string;
                  
                },
                i: number
              ) => (
                <li key={i} className="m-3" onClick={()=> {
                  descriptionHandler(item.description)

                }}>
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
        <div className="">
          <div className="sticky top-0 bg-red-900 ">
            <h2>Description</h2>
           
          </div>
          <p>{currentDes}</p>
        </div>
      </div>
    </div>
  );
};

export type Project = {
  id: string;
  githubUrl: string;
  title: string;
  icon: string;
  description: string;
};
