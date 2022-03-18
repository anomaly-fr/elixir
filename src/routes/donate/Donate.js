import { React, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Avatar, Button, TextField, Alert } from '@mui/material'
import image from '../../charity.jpg'
import './Donate.css'
import ProgressBar from '../../components/ProgressBar'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'

const Donate = () => {
  const location = useLocation()
  console.log('This', location.state)
  const project = location.state
  let amountRaised = parseInt(project.amountRaised._hex)
  let amountToRaise = parseInt(project.amountToRaise._hex)
  const [errorText, setErrorText] = useState('')
  const [amount, setAmount] = useState(0)
  const [contract, setContract] = useState()
  const [signerAddress, setSignerAddress] = useState()

  const { isAuthenticated, user, auth } = useMoralis()

  useEffect(() => {
    setUp()
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

  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    setSignerAddress(address)

    const litres = new ethers.Contract(
      process.env.REACT_APP_LITRES_CONTRACT_ADDRESS,
      LitresAbi,
      signer,
    )
    setContract(litres)
    console.log('LITS', litres)
  }

  const makeDonation = async () => {
    console.log(project.owner, amount, parseInt(project.campaignID._hex))
    await contract
      .donateToCampaign(
        project.owner,
        amount,
        parseInt(project.campaignID._hex),
      )
      .then(() => {
        alert('Donation Successful')
      })
    // console.log('Alive', contract)
    // const bal = await contract.balanceOf(contract.signer.getAddress())
    // console.log('BAL', bal)
  }

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1
        // align="center"
        // fontSize={20}
        // fontFamily={'Poppins'}
        className="donate-heading"
      >
        {project.campaignName}
      </h1>
      <img className="donate-image" src={image} alt="project" />
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '95%',
        }}
      >
        <div className="by">
          <Avatar>{project.ownerName.charAt(0)}</Avatar>
          <h3>{`By ${project.ownerName}`}</h3>
        </div>

        <p
          style={{ fontWeight: 'bold', fontSize: '1.5rem', padding: '0%' }}
          className="about"
        >{`${amountRaised} LIT raised out of ${amountToRaise} LIT`}</p>
        <ProgressBar progress={24} />
        <p className="about">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1%',
            backgroundColor: '#EEF4F8',
          }}
        >
          <TextField
            inputMode="numeric"
            style={{ padding: '2%' }}
            id="outlined-basic"
            placeholder="Amount in LIT"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            onClick={() => {
              if (!isAuthenticated)
                setErrorText('Connect with Metamask to donate!')
              else if (
                signerAddress.toUpperCase() !==
                user.get('ethAddress').toUpperCase()
              ) {
                setErrorText('You are logged in with a different account!')
                console.log(
                  'Signer',
                  signerAddress,
                  'User',
                  user.get('ethAddress'),
                )
              } else if (amount <= 0 || amount > amountToRaise - amountRaised) {
                setErrorText('Invalid amount!')
              } else {
                makeDonation()
                //  console.log(user, auth)
              }
            }}
            variant="contained"
            color="primary"
          >
            Contribute Now
          </Button>
          <h4 style={{ color: 'red' }}>{errorText}</h4>
        </div>
      </div>
    </div>
  )
}

export default Donate
