import React from 'react'

interface description {
    details:string

}

const StartProjectDescription = (props:description) => {
  return (
    <div>{props.details}</div>
  )
}

export default StartProjectDescription