import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'
import { ethers } from 'ethers'
import UserAbi from '../../UserAbi.json'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()
  const { REACT_APP_USER_CONTRACT_ADDRESS } = process.env
  const [ethUser, setEthUser] = useState(null)

  const [userTypes, setUserTypes] = useState({
    userType1: false,
    userType2: false,
    userType3: false,
  })

  return (
    <div className="root">
      {!isAuthenticated ? (
        <div>
          <p className="text">Connect with Metamask</p>
          <Button variant="contained" onClick={authenticate}>
            Sign with Metamask
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1%',
          }}
        >
          <p className="text">Welcome to Elixir!</p>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
          <p className="center">Address: {user.get('ethAddress')}</p>
        </div>
      )}
    </div>
  )
}
