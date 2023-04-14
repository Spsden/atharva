import React from 'react'

const ContextMenu = () => {
  return (
    <div>
    {data.map((item) => (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
         
        }}
      >
        
      </div>
    ))}
  </div>
  );
};

export default ContextMenu;

export const data = [
  {
    id: 1,
    title: "Message 1",
  },
  {
    id: 2,
    title: "Message 2",
  },

]