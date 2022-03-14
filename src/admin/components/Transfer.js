import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaidIcon from '@mui/icons-material/Paid'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'

import './Transfer.css'

export default function Transfer() {
  const [balance, setBalance] = useState(0)
  const [toAddress, setToAddress] = useState(null)
  const [amount, setAmount] = useState(0)
  const [adminAccount, setAdminAccount] = useState(
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  )

  const { REACT_APP_LITRES_CONTRACT_ADDRESS } = process.env
  const [contractDetails, setContractDetails] = useState({
    address: 'loading...',
    name: 'loading...',
    symbol: 'loading...',
    decimals: 'loading...',
    initialSupply: 'loading...',
  })

  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
    await provider.send('eth_requestAccounts', [])
    const litres = new ethers.Contract(
      REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      provider,
    )

    const name = await litres.name()
    const symbol = await litres.symbol()
    const decimals = await litres.decimals()
    const initialSupply = await litres.totalSupply()

    // const num = await litres.balanceOf(
    //   '0x95ecb96042969c8026F25aB0dEec130B4E8fE040',
    // )
    // console.log(num)
    const newContract = {
      name,
      symbol,
      decimals,
      initialSupply,
    }
    setContractDetails(newContract)

    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    setAdminAccount(signerAddress)

    const balance = await litres.balanceOf(signerAddress)
    setBalance(balance.toNumber())
    console.log('Balance', balance.toNumber())
    // console.log('Signer', signerAddress)
  }

  useEffect(() => {
    getData()
    console.log('FETCHED')
  }, [])

  const updateBalance = async () => {
    console.log('Called')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const signerAddress = await signer.getAddress()
    const litres = new ethers.Contract(
      REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      signer,
    )
    const b = await litres.balanceOf(signerAddress)

    setBalance(b.toNumber())
  }

  const actualTransfer = async (litres) => {
    await litres.transfer(toAddress, amount)
    return 'done'
  }

  const transfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()

    const litres = new ethers.Contract(
      REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      signer,
    )
    console.log('To', toAddress)
    console.log('Amount', amount)
    actualTransfer(litres).then((res) => {
      console.log('After actual transfer', balance)
      console.log('res', res)
    })
  }
  return (
    <div className="root">
      <Typography fontSize={'2em'} fontWeight={'bold'}>
        Litres
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
            transfer().then((res) => {
              console.log('Transfer complete', res)
              updateBalance()
            })
          }}
          endIcon={<PaidIcon />}
        >
          Send
        </Button>{' '}
      </Card>
    </div>
  )
}
