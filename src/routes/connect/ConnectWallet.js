import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export default function ConnectWallet() {
  const { authenticate, isAuthenticated } = useMoralis()

  useEffect(() => authenticate(), [])
  if (window.ethereum) {
    connect()
  } else {
    alert('Consider Metamask')
  }

  return (
    <div>{isAuthenticated ? <div>Logged in</div> : <div>Logged out</div>}</div>
  )
}

const connect = async () => {}
