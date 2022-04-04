import { React, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Avatar, Button, TextField, Alert, LinearProgress } from '@mui/material'
import image from '../../charity.jpg'
import './Donate.css'
import ProgressBar from '../../components/ProgressBar'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import LitresAbi from '../../LitresAbi.json'
import { useNavigate } from 'react-router-dom'

const Donate = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log('This', location.state)
  const project = location.state
  console.log(project)

  const [errorText, setErrorText] = useState('')
  const [amount, setAmount] = useState()
  const [contract, setContract] = useState()
  const [signerAddress, setSignerAddress] = useState()
  const [amountRaised, setAmountRaised] = useState(
    parseInt(project?.amountRaised._hex),
  )
  const [amountToRaise, setAmountToRaise] = useState(
    parseInt(project?.amountToRaise._hex),
  )
  const [loading, setLoading] = useState(false)

  const { isAuthenticated, user, auth } = useMoralis()

  useEffect(() => {
    setUp()
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload()
      })
    }
  })

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  })

  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    //  const signer = new ethers.Wallet(pk, provider)
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
    setErrorText('')
    console.log(project.owner, amount, parseInt(project.campaignID._hex))
    setLoading(true)
    await contract
      .donateToCampaign(
        project.owner,
        amount,
        parseInt(project.campaignID._hex),
        project.campaignName,
        Math.floor(new Date().getTime()),
        {
          gasLimit: 1000000,
        },
      )
      .then(async () => {
        // setAmountRaised(amountRaised + amount)
        setTimeout(() => {
          navigate('/projects')
        }, 8000)
        // setLoading(false)
      })
      .catch((e) => {
        //   setErrorText('You might have insufficent funds')
        console.log(e)
      })
    console.log('Alive', contract)
    const bal = await contract.balanceOf(contract.signer.getAddress())
    console.log('BAL', bal)
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
        {project?.campaignName}
      </h1>
      <img
        className="donate-image"
        src={`https://ipfs.moralis.io:2053/ipfs/${project.imageHash}`}
        alt="project"
      />
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
        <ProgressBar progress={(amountRaised / amountToRaise) * 100} />
        <p className="about">{project.aboutHash}</p>
        <LinearProgress style={{ opacity: loading ? 1 : 0 }} />

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
              } else if (amount) {
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
