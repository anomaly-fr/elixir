import React, { useEffect, useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import CampaignsAbi from '../CampaignsAbi.json'
import { useMoralis } from 'react-moralis'

const AppTopBar = ({ about, location }) => {
  const { isAuthenticated } = useMoralis()
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
        <Link className="link" to="/projects">
          <MenuButton title={'Donate'} />
        </Link>
        <Link
          className="link"
          to={isAuthenticated ? '/projects/my-projects' : '/login'}
          //    state={projects}
        >
          <MenuButton title={'My Projects'} />
        </Link>
        <Link className="link" to="/login">
          <MenuButton title={'Connect'} />
        </Link>
        <Link className="link" to="/profile">
          <MenuButton title={'Me'} />
        </Link>
      </div>
    </div>
  )
}

export default AppTopBar
