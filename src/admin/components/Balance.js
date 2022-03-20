import { TextField, Card, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'

export default function Balance() {
  console.log('Contract Address', process.env.REACT_APP_LITRES_CONTRACT_ADDRESS)

  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])

    const signer = await provider.getSigner()
    const litres = new ethers.Contract(
      process.env.REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      provider,
      signer,
    )
    const signerAddress = await signer.getAddress()
    console.log('Acc', account)
    const b = await litres.balanceOf(account)
    console.log('b', b)

    setBalance(b)
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => {
      window.location.reload()
    })
  })

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })
  })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '5%',
      }}
    >
      <Card className="box">
        <TextField
          placeholder={'Account address'}
          id="filled-basic"
          variant="filled"
          onChange={(e) => {
            setAccount(e.target.value)
          }}
        />
        <TextField
          placeholder="Balance"
          id="filled-basic"
          variant="filled"
          disabled
          value={balance}
        />
        <Button
          style={{ margin: '2%' }}
          variant="contained"
          endIcon={<CheckCircleIcon />}
          onClick={() =>
            getBalance(process.env.REACT_APP_LITRES_CONTRACT_ADDRESS)
          }
        >
          Get Balance
        </Button>{' '}
      </Card>
    </div>
  )
}
