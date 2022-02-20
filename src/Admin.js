import { Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import PaidIcon from '@mui/icons-material/Paid'
import Web3 from 'web3/dist/web3.min'
import DonaCoin from './contracts/DonaCoin.json'

import './Admin.css'

const EXCHANGE_RATE = 100
export default function Admin() {
  const [DCFirst, isDCFirst] = useState(true)
  const [value, setValue] = useState(1)
  const [donaCoin, setDonaCoin] = useState()
  const [balance, setBalance] = useState('')
  const [account, setAccount] = useState('')

  const setUp = async () => {
    const my1Func = async () => {
      //   await this.loadWeb3();
      await loadBlockchainData()
    }

    window.web3 = await loadWeb3()
    await loadBlockchainData()
    await window.ethereum.enable()

    window.ethereum.on('accountsChanged', function () {
      window.web3.eth.getAccounts(function (error, accounts) {
        console.log(accounts[0], 'current account after account change')
        //setTaccount(accounts[0])
        //   myFunc(accounts[0])
        my1Func()
        window.location.reload()
      })
    })
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account

    const accounts = await web3.eth.getAccounts()
    console.log('Account: ' + accounts)
    setAccount(accounts[0])
    //  this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = DonaCoin.networks[networkId]
    if (deployedNetwork) {
      // Assign contract
      const DC = new web3.eth.Contract(
        DonaCoin.abi,
        deployedNetwork && deployedNetwork.address,
      )
      setDonaCoin(DC)
      // Get the balance
      const bal = await donaCoin.methods.get().call()
      setBalance(bal)
      console.log(balance)
      console.log('Done')
    } else {
      console.log('error')
    }
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.web3 = null
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
    return window.web3
  }

  useEffect(() => {
    setUp()
  }, [])

  return (
    <div className="root">
      <h1>Admin Controls</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100vw',
        }}
      >
        <Card className="box">
          <TextField
            placeholder={DCFirst ? 'DC' : 'INR'}
            id="filled-basic"
            variant="filled"
            value="1"
            label={DCFirst ? 'DC' : 'INR'}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <TextField
            placeholder={DCFirst ? 'INR' : 'DC'}
            label={DCFirst ? 'INR' : 'DC'}
            id="filled-basic"
            variant="filled"
            value={DCFirst ? DCToINR(value) : INRToDC(value)}
          />
          <Button
            style={{ margin: '2%' }}
            variant="contained"
            endIcon={<CompareArrowsIcon />}
            onClick={() => isDCFirst(!DCFirst)}
          >
            Flip
          </Button>{' '}
        </Card>
        <Card className="box">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography fontWeight={'bold'}>Admin account: </Typography>
            <Typography>XXXXXXXXXXXX</Typography>
          </div>
          <TextField placeholder="To" id="filled-basic" variant="filled" />
          <Button
            style={{ margin: '5%' }}
            variant="contained"
            endIcon={<PaidIcon />}
          >
            Send
          </Button>{' '}
        </Card>
      </div>
    </div>
  )
}

function DCToINR(value) {
  // 1 DC=100INR
  return value * EXCHANGE_RATE
}
function INRToDC(value) {
  // 1 INR=0.01
  return value / EXCHANGE_RATE
}
