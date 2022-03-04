import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaidIcon from '@mui/icons-material/Paid'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import './Transfer.css'

export default function Transfer({ contractAddress }) {
  const [balance, setBalance] = useState(0)
  const [toAddress, setToAddress] = useState(null)
  const [amount, setAmount] = useState(0)
  const [adminAccount, setAdminAccount] = useState(
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  )
  const [contractDetails, setContractDetails] = useState({
    address: '',
    name: '',
    symbol: '',
    decimals: '',
    initialSupply: '',
  })

  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
    await provider.send('eth_requestAccounts', [])
    const donaCoin = new ethers.Contract(contractAddress, LitresAbi, provider)

    const name = await donaCoin.name()
    const symbol = await donaCoin.symbol()
    const decimals = await donaCoin.decimals()
    const initialSupply = await donaCoin.totalSupply()

    // const num = await donaCoin.balanceOf(
    //   '0x95ecb96042969c8026F25aB0dEec130B4E8fE040',
    // )
    // console.log(num)
    setContractDetails({
      name,
      symbol,
      decimals,
      initialSupply,
    })

    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    setAdminAccount(signerAddress)

    const balance = await donaCoin.balanceOf(signerAddress)
    setBalance(balance.toNumber())
    console.log('Balance', balance.toNumber())
    // console.log('Signer', signerAddress)
  }

  useEffect(() => {
    getData()
  }, [])

  const updateBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    const donaCoin = new ethers.Contract(contractAddress, LitresAbi, signer)
    const b = await donaCoin.balanceOf(signerAddress)
    console.log('New balance', b.toNumber())
    setBalance(b.toNumber())
  }

  const transfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()

    const donaCoin = new ethers.Contract(contractAddress, LitresAbi, signer)
    console.log('To', toAddress)
    await donaCoin.transfer(toAddress, amount)

    updateBalance()
  }
  return (
    <div className="root">
      <Typography fontSize={'2em'} fontWeight={'bold'}>
        Dona Coin
      </Typography>
      <Typography>{`Symbol: ${contractDetails.symbol}`}</Typography>
      <Typography>{`InitialSupply: ${contractDetails.initialSupply}`}</Typography>
      <Typography>{`Admin Balance: ${balance}`}</Typography>
      <Typography fontWeight={'bold'}>Current account*: </Typography>
      <Typography style={{ color: 'blue' }}>
        {`   xxxxxx${adminAccount.slice(38, adminAccount.length)}`}
      </Typography>

      <Card className="box">
        <div style={{ display: 'flex', flexDirection: 'row' }}></div>
        <TextField
          onChange={(e) => {
            setToAddress(e.target.value)
            console.log('Captured', toAddress)
          }}
          placeholder="To"
          id="filled-basic"
          variant="filled"
        />
        <TextField
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in LIT"
          id="filled-basic"
          variant="filled"
        />
        <Button
          style={{ margin: '5%' }}
          variant="contained"
          onClick={() => {
            transfer()
          }}
          endIcon={<PaidIcon />}
        >
          Send
        </Button>{' '}
      </Card>
    </div>
  )
}
