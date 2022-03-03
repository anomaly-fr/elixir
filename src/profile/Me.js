import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Link } from 'react-router-dom'
import './Me.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ethers } from 'ethers'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'

import DonaCoinAbi from '../DonaCoinAbi.json'

const CONTRACT_ADDRESS = '0xd7Aa490Afe35474a6c46940f9A5f038042fcefF6'

const getBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const donaCoin = new ethers.Contract(CONTRACT_ADDRESS, DonaCoinAbi, signer)
  const balance = await donaCoin.balanceOf(signer.getAddress())
  return balance
}

const Me = () => {
  const { isAuthenticated } = useMoralis()
  return (
    <div className="me">{isAuthenticated ? <Profile /> : <ConnectFirst />}</div>
  )
}

const Profile = () => {
  useEffect(() => {
    const bal = getBalance().then((res) => {
      console.log('Res', res)
      updateBalance(res.toNumber())
    })
  }, [])
  const [balance, setBalance] = useState(0)

  const updateBalance = (b) => {
    console.log('Setting', b)
    setBalance(b)
  }
  const { user } = useMoralis()
  return (
    <div>
      <div className="profile-header">
        <p className="profile-header-text">Your Profile</p>
        <p className="center">Address: {user.get('ethAddress')}</p>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={'bold'}>Wallet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{`Balance: ${balance} DC`}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

const ConnectFirst = () => {
  return (
    <div>
      Join us!
      <Link to="/login">
        <Button text="Connect with MetaMask" />
      </Link>
    </div>
  )
}

export default Me
