import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { Link } from 'react-router-dom'
import './ConnectWallet.css'
import KeyIcon from '@mui/icons-material/Key'
import { ethers } from 'ethers'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'

import LitresAbi from '../../LitresAbi.json'

const { REACT_APP_LITRES_CONTRACT_ADDRESS } = process.env

const getBalance = async (user) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  const signer = await provider.getSigner()
  const litres = new ethers.Contract(
    REACT_APP_LITRES_CONTRACT_ADDRESS,
    LitresAbi,
    signer,
  )
  const balance = await litres.balanceOf(user)
  return balance
}

const Me = () => {
  const { isAuthenticated, user } = useMoralis()
  return (
    <div className="me">
      {isAuthenticated ? <Profile user={user} /> : <ConnectFirst />}
    </div>
  )
}

const Profile = ({ user }) => {
  useEffect(() => {
    getBalance(user.get('ethAddress')).then((res) => {
      console.log('Res', res)
      updateBalance(res.toNumber())
    })
  }, [])
  const [balance, setBalance] = useState('loading...')

  const updateBalance = (b) => {
    console.log('Setting', b)
    setBalance(b)
  }

  return (
    <div>
      <Accordion disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<KeyIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight={'bold'}>Wallet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{`Address: ${user.get('ethAddress')}`}</Typography>
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
