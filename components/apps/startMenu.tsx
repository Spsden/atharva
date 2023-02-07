import React from "react";

export let allProjects: Project[] = [
  {
    id: "1",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Drip",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
  {
    id: "2",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Jott Notes",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
  {
    id: "3",
    githubUrl: "www.github.com/Spsden/drip",
    title: "RushApi",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
  {
    id: "4",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Obsy",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
  {
    id: "5",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Daraz",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
  {
    id: "6",
    githubUrl: "www.github.com/Spsden/drip",
    title: "Drip",
    icon: "https://i.imgur.com/L3Ip1wh.png",
  },
];

export const StartMenu = () => {
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
                },
                i: number
              ) => (
                <li key={i} className="m-3">
                  <div className="flex">
                    <img className="h-10" src={item.icon} alt="icon" />
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
};
