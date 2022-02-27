import React, { useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'

const AppTopBar = ({ about }) => {
  return (
    <div className="App-top-bar">
      <div className="icon">
        <CardGiftcardIcon />
      </div>

      <div className="empty" />
      <div className="App-top-bar-menu">
        {/* <Link className="link" to="/about"> */}
        <div onClick={about}>
          <MenuButton title={'About Us'} />
        </div>
        {/* </Link> */}

        <Link className="link" to="/">
          <MenuButton title={'Home'} />
        </Link>

        <MenuButton title={'Projects'} />

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
