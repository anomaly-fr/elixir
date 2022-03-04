import { Button, Typography } from '@mui/material'
import React from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'
import { ethers } from 'ethers'
import UserAbi from '../../UserAbi.json'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()

  const fetchUserInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const litres = new ethers.Contract(
      process.env.REACT_APP_ETH_CONTRACT_ADDRESS,
      UserAbi,
      provider,
    )
    const userType1 = await litres.isType1(user.get('ethAddress'))
    const userType2 = await litres.isType2(user.get('ethAddress'))
    const userType3 = await litres.isType3(user.get('ethAddress'))
    console.log('?', userType1, userType2, userType3)
  }

  const authentication = async () => {
    await authenticate()
      .then((res) => {
        console.log('res', res)
        fetchUserInfo()
          .then(() => {
            console.log('Done')
          })
          .catch((e) => console.log(e))
      })
      .catch((err) => {
        alert('Failed to authenticate')
      })
  }

  return (
    <div className="root">
      {!isAuthenticated ? (
        <div>
          <p className="text">Connect with Metamask</p>
          <Button
            variant="contained"
            onClick={() => {
              authentication()
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
