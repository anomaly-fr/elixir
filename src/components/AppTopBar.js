import React, { useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'

const AppTopBar = () => {
  return (
    <div className="App-top-bar">
      <div className="icon">
        <CardGiftcardIcon />
      </div>

      <div className="empty" />
      <div className="App-top-bar-menu">
        <Link to="/about">
          <MenuButton title={'About Us'} />
        </Link>

        <Link to="/home">
          <MenuButton title={'Home'} />
        </Link>

        <MenuButton title={'Projects'} />

        <Link to="/login">
          <MenuButton title={'Sign Up'} />
        </Link>
      </div>
    </div>
  )
}

export default AppTopBar
