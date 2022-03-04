import { TextField, Card, Button } from '@mui/material'
import React, { useState } from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'

export default function Balance({ contractAddress }) {
  console.log('Addre', contractAddress)

  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const getBalance = async (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])

    const litres = new ethers.Contract(contractAddress, LitresAbi, provider)
    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    const b = await litres.balanceOf(account)
    console.log('b', b)

    setBalance(b)
  }
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
          onClick={() => getBalance(contractAddress)}
        >
          Get Balance
        </Button>{' '}
      </Card>
    </div>
  )
}
