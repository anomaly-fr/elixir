import { Button, Typography } from '@mui/material'
import React from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()

  return (
    <div className="root">
      {!isAuthenticated ? (
        <div>
          <p className="text">Connect with Metamask</p>
          <Button
            variant="contained"
            onClick={() => {
              authenticate()
            }}
          >
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
