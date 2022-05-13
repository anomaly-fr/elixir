import React, { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'
import { useMoralis } from 'react-moralis'
const MenuButton = ({ title }) => {
  const [hover, setHover] = useState(false)

  const { logout } = useMoralis()

  return (
    <div
      onClick={title === 'Logout' ? logout : null}
      style={{
        color: 'white',
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
