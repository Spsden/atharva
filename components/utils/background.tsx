import React from 'react'
import Image  from 'next/image';
import wallpaper from "../assets/winapple.jpg";
import { url } from 'inspector';

export default function BackgroundImage() {
  return (
    <div style={{backgroundImage : `url('./assets/walle.jpg')` ,backgroundRepeat: "no-repeat", backgroundPositionX: "center", backgroundSize:'cover'}}
    className=" absolute -z-10 top-0 right-0 overflow-hidden h-full w-full">
        {/* <Image 
        className={"z-0 "}
        src = {wallpaper}
        alt = "wallpaer here"
        layout='fill'
        objectFit='cover'
        objectPosition='cover' */}
    
        
    </div>
  )
}
