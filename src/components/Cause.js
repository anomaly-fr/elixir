import Restaurant from '@mui/icons-material/Restaurant'
import { Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Cause.css'

export default function Cause({ charityName, icon }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className={'Cause'}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <div>{charityName}</div>
      {icon}
    </div>
  )
}
