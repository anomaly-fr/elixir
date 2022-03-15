import React, { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'

const MenuButton = ({ title }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className={hover ? 'menu-hover' : 'menu'}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
      >
        <p>{title}</p>
      </div>
    </div>
  )
}

export default MenuButton
