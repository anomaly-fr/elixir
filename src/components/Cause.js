import { Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Charity.css'

export default function Cause({ charityName }) {
  const [hover, setHover] = useState(false)
  return (
    <Card
      className={hover ? 'Charity-hover' : 'Charity'}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      <Link style={{ textDecoration: null }} to={'projects'}>
        <Typography>{charityName}</Typography>
      </Link>
    </Card>
  )
}
