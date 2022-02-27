import { Button, Typography } from '@mui/material'
import React from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()

  if (!isAuthenticated) {
    console.log(auth)
    return (
      <div>
        <Button variant="contained" onClick={() => authenticate()}>
          Authenticate
        </Button>
      </div>
    )
  }

  return (
    <div>
      {!isAuthenticated ? (
        <p className="text">Connect with Metamask</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '1%',
          }}
        >
          <p className="text">Welcome to Elixir!</p>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
        </div>
      )}
      <p className="center">Address: {user.get('username')}</p>
    </div>
  )
}
