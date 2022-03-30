import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'
import { ethers } from 'ethers'
import UserAbi from '../../UserAbi.json'
import CampaignsAbi from '../../CampaignsAbi.json'
import Me from './Me'
import TransactionCard from '../../components/TransactionCard'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()
  const [contract, setContract] = useState()
  const [campaignsContract, setCampaignsContract] = useState()
  const [transactions, setTransactions] = useState([])
  const [campaigns, setCampaigns] = useState(new Map())

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
  })

  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
      process.env.REACT_APP_USER_CONTRACT_ADDRESS,
      UserAbi,
      provider,
    )
    const campaignsContract = new ethers.Contract(
      process.env.REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      provider,
    )
    setContract(contract)
    setCampaignsContract(campaignsContract)
  }

  const getData = async () => {
    const data = await contract.getTransactions(user.get('ethAddress'))

    const map = new Map()

    console.log('MAP', map)
    setTransactions(data)
    setCampaigns(map)
    console.log('DATA', Date(parseInt(data[0].timeStamp._hex)))
  }
  useEffect(() => {
    setUp()
  }, [])

  useEffect(() => {
    getData()
  }, [contract])

  useEffect(() => {
    getData()
    console.log('auth')
  }, [isAuthenticated])

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <p className="text">Connect with Metamask</p>
          <Button variant="contained" onClick={authenticate}>
            Sign with Metamask
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: '20vh',
              }}
            >
              <p className="text">Welcome to Elixir!</p>

              <Button
                style={{ alignSelf: 'flex-start', margin: '1%' }}
                onClick={logout}
                variant="contained"
              >
                Logout
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',

                width: '100%',
                height: '30vh',
              }}
            >
              <Me />
            </div>

            <div className="connect-body">
              {transactions.map((transaction, index) => (
                <TransactionCard transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
