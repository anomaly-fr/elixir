import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import './ConnectWallet.css'
import { ethers } from 'ethers'
import UserAbi from '../../UserAbi.json'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated, user, auth, logout } = useMoralis()
  const { REACT_APP_USER_CONTRACT_ADDRESS } = process.env
  const [ethUser, setEthUser] = useState(null)

  const [userTypes, setUserTypes] = useState({
    userType1: false,
    userType2: false,
    userType3: false,
  })

  useEffect(() => {
    console.log('Fetching user types', REACT_APP_USER_CONTRACT_ADDRESS)
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    console.log('Oh no')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const userContract = new ethers.Contract(
      REACT_APP_USER_CONTRACT_ADDRESS,
      UserAbi,
      signer,
      provider,
    )
    console.log(userContract)
    // console.log('ADD', user.get('ethAddress'))

    const userType1 = await userContract.isType1(user.get('ethAddress'))
    console.log('Here', userType1)
    // const userType2 = await user.isType2(user.get('ethAddress'))
    // const userType3 = await user.isType3(user.get('ethAddress'))
    if (!userType1) {
      await userContract.createUser(user.get('ethAddress'))
      console.log('Created')
    }

    console.log("User's type:", userType1)
    const getUser = await userContract.getUser(user.get('ethAddress'))
    console.log('Result', getUser)

    setEthUser(getUser)

    // setUserTypes({ userType1, userType2, userType3 })
  }

  const authentication = async () => {
    await authenticate()
      .then((res) => {
        console.log('res', res)
        fetchUserInfo()
          .then(() => {
            console.log('Done')
          })
          .catch((e) => console.log(e))
      })
      .catch((err) => {
        alert('Failed to authenticate')
      })
  }

  return (
    <div className="root">
      <p>{`User 1: ${userTypes.userType1} User 2: ${userTypes.userType2}User 3: ${userTypes.userType3} `}</p>
      {!isAuthenticated ? (
        <div>
          <p className="text">Connect with Metamask</p>
          <Button
            variant="contained"
            onClick={() => {
              authentication()
            }}
          >
            Sign with Metamask
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1%',
          }}
        >
          <p className="text">Welcome to Elixir!</p>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
          <p className="center">Address: {user.get('ethAddress')}</p>
        </div>
      )}
    </div>
  )
}
