import React, { useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'

const AppTopBar = () => {
  return (
    <div className="App-top-bar">
      <div className="icon">
        <CardGiftcardIcon />
      </div>

      <div className="empty" />
      <div className="App-top-bar-menu">
        <MenuButton title={'About Us'} />
        <MenuButton title={'Home'} />

        <MenuButton title={'Projects'} />

        <MenuButton title={'Sign Up'} />
      </div>
    </div>
  )
}

export default AppTopBar
