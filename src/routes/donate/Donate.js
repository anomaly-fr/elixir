import { React, useState } from 'react'
import { useParams } from 'react-router-dom'
const Donate = () => {
  let params = useParams()
  return <div>{params.projectID}</div>
}

export default Donate
