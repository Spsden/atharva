import React from 'react'

import { Dolo } from './window'

import dynamic from 'next/dynamic';
const WinBox = dynamic(() => import('react-winbox'), {ssr: false});

function WinContainer() {
  return (
    <WinBox

    width= '500'
    height={300}
    x="center"
    y={30}
    //noClose={this.state.inEditing}
    >

<div>
    <h1>Hello, WinBox!</h1>
   <Dolo/>
  </div>
    </WinBox>
  )
}

export default WinContainer