import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'
import { ethers } from 'ethers'
import UserAbi from '../../UserAbi.json'
import Me from './Me'
import TransactionCard from '../../components/TransactionCard'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()
  const [contract, setContract] = useState()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  })

  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      process.env.REACT_APP_USER_CONTRACT_ADDRESS,
      UserAbi,
      provider,
    )

    setContract(contract)
  }

  const getData = async () => {
    const data = await contract.getTransactions(user.get('ethAddress'))

    setTransactions(data)
    console.log('DATA', Date(parseInt(data[0].timeStamp._hex)))
  }
  useEffect(() => {
    setUp()
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      getData()
    }
  }, [contract])

  useEffect(() => {
    getData()
    console.log('auth')
  }, [isAuthenticated])
  // if (!window.ethereum) {
  //   return <h1>Metamask</h1>
  // }
  if (!window.ethereum) {
    alert('You need Metamask to use this website!')
  }
  return (
    <div
      style={{
        backgroundColor: '#0b111b',
        backgroundSize: 'cover',
        display: 'flex',

        flexDirection: 'column',
        flex: 1,
      }}
    >
      {!isAuthenticated ? (
        <div
          style={{
            backgroundColor: '#0b111b',
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p className="text">Connect with Metamask</p>
          <Button
            style={{ backgroundColor: '#8A83BC' }}
            variant="contained"
            onClick={authenticate}
          >
            Sign In with Metamask
          </Button>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* <Button
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#8A83bc',
                margin: '1%',
              }}
              onClick={logout}
              variant="contained"
            >
              Logout
            </Button> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                height: '20vh',
              }}
            >
              <p className="text">Welcome to Elixir!</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                width: '100%',
              }}
            >
              <Me />
            </div>

            {transactions.length !== 0 ? (
              <div className="connect-body">
                {transactions.map((transaction, index) => (
                  <TransactionCard transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="connect-body">
                <p className="text">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
