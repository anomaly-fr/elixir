import { ethers } from 'ethers'
import { React, useEffect, useState } from 'react'
import DonaCoinAbi from './DonaCoinAbi.json'

export default function Test() {
  const [contractDetails, setContractDetails] = useState({
    address: '',
    name: '',
    symbol: '',
    decimals: '',
    initialSupply: '',
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const donaCoin = new ethers.Contract(
      '0x4Ff0774eCAE45348E345Fb535229631e24937EB4',
      DonaCoinAbi,
      provider,
    )

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

    const balance = await donaCoin.balanceOf(signerAddress)
    console.log('Balance', balance.toNumber())
  }

  return (
    <div>
      <h1>{contractDetails.name}</h1>
      <h2>{contractDetails.symbol}</h2>
    </div>
  )
}
