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

import LitresAbi from '../LitresAbi.json'

const CONTRACT_ADDRESS = process.env.REACT_APP_ETH_CONTRACT_ADDRESS

const getBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const litres = new ethers.Contract(CONTRACT_ADDRESS, LitresAbi, signer)
  const balance = await litres.balanceOf(signer.getAddress())
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
          <Typography>{`Balance: ${balance} LIT`}</Typography>
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
