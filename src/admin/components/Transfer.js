import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaidIcon from '@mui/icons-material/Paid'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'
import useWindowDimensions from '../../components/useWindowDimensions'

import './Transfer.css'

export default function Transfer() {
  const [balance, setBalance] = useState(0)
  const [toAddress, setToAddress] = useState(null)
  const [amount, setAmount] = useState(0)
  const [adminAccount, setAdminAccount] = useState(
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  )

  const { width } = useWindowDimensions()
  const { REACT_APP_LITRES_CONTRACT_ADDRESS } = process.env
  const [contractDetails, setContractDetails] = useState({
    address: 'Loading...',
    name: 'Loading...',
    symbol: 'Loading...',
    decimals: 'Loading...',
    initialSupply: 'Loading...',
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
    const signerA = await signer.getAddress()
    setAdminAccount(signerA)

    const balance = await litres.balanceOf(signerA)
    setBalance(balance.toNumber())
    console.log('Balance', balance.toNumber())
    // console.log('Signer', signerAddress)
  }

  useEffect(() => {
    getData()
    console.log('FETCHED')
  }, [])
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

  const updateBalance = async () => {
    console.log('Called')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const litres = new ethers.Contract(
      REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      signer,
    )
    const b = await litres.balanceOf(
      process.env.REACT_APP_LITRES_CREATOR_ADDRESS,
    )

    setBalance(b.toNumber())
  }

  const actualTransfer = async (litres) => {
    await litres.transfer(toAddress, amount, {
      gasLimit: 1000000,
    })

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
      <Typography color={'white'} fontSize={'2em'} fontWeight={'bold'}>
        Litres
      </Typography>
      <Typography
        color={'white'}
      >{`Symbol: ${contractDetails.symbol}`}</Typography>
      <Typography
        color={'white'}
      >{`Initial Supply: ${contractDetails.initialSupply}`}</Typography>
      {/* <Typography>{`Admin Balance: ${balance}`}</Typography> */}
      <Typography color={'white'} fontWeight={'bold'}>
        Current account:{' '}
      </Typography>
      <Typography style={{ color: 'blue' }}>
        {`   xxxxxx${adminAccount.slice(38, adminAccount.length)}`}
      </Typography>

      <Card
        style={{
          width: width > 700 ? '40%' : '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
          style={{ backgroundColor: '#1c183c', margin: '5%' }}
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
