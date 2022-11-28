import React from 'react'
import {Rnd} from "react-rnd";

function ContentArea() {
  return (
    <Rnd  style={{
        backdropFilter: "blur(30px)",
        margin: "10px",
        right: "5px",
        left: "5px",
        border:'solid black'
      }}className='lex align-center justify-center border-red-700 '
    default={
        {
            x:0,
            y:0,
            width:200,
            height:200
        }
    }>
         <div className='flex align-center justify-center border-neutral-300 bg-black'>Hello Brother</div>

    </Rnd>
   
  )
}

export default ContentArea