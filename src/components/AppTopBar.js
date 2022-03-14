import React, { useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'

const AppTopBar = ({ about, location }) => {
  return (
    <div className="App-top-bar">
      <div className="icon">
        <CardGiftcardIcon />
      </div>

      <div className="empty" />
      <div className="App-top-bar-menu">
        <Link className="link" to="/">
          <MenuButton title={'Home'} />
        </Link>
        <Link className="link" to="/donate">
          <MenuButton title={'Donate'} />
        </Link>
        <MenuButton title={'My Projects'} />

        <Link className="link" to="/login">
          <MenuButton title={'Connect Wallet'} />
        </Link>
        <Link className="link" to="/profile">
          <MenuButton title={'Me'} />
        </Link>
      </div>
    </div>
  )
}

export default AppTopBar
