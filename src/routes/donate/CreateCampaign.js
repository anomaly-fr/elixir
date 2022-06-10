import React, { useEffect } from 'react'
import './CreateCampaign.css'
import {
  Button,
  Chip,
  Grid,
  Input,
  LinearProgress,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import CampaignsAbi from '../../CampaignsAbi.json'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'

const CreateCampaign = () => {
  const [campaignCategory, setCampaignCategory] = useState(7)
  const [campaignName, setCampaignName] = useState('')
  const [campaignDescription, setCampaignDescription] = useState('')
  const [campaignCreator, setCampaignCreator] = useState('')
  const [campaignImage, setCampaignImage] = useState('')
  const [campaignAmount, setCampaignAmount] = useState(0)
  const [contract, setContract] = useState()
  const [signer, setSigner] = useState()
  const [signerAddress, setSignerAddress] = useState()
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { user } = useMoralis()

  const { saveFile } = useMoralisFile()

  let categoryArray = [
    { index: 1, name: 'Health' },
    { index: 2, name: 'Refugees' },
    { index: 3, name: 'Education' },
    { index: 4, name: 'Hunger' },
    { index: 5, name: 'Poverty' },
    { index: 6, name: 'Nature' },
    { index: 7, name: 'Personal' },
    { index: 8, name: 'Other' },
  ]

  const handleImage = async (e) => {
    const file = e.target.files[0]
    const data = await saveFile(file.name, file, {
      saveIPFS: true,
    })
    console.log(data._hash)
    setCampaignImage(data._hash)
  }

  const submit = async () => {
    await contract.createCampaign(
      user.get('ethAddress'),
      campaignCreator,
      campaignName,
      campaignDescription,
      campaignImage,
      campaignAmount,
      campaignCategory.toString(),
    )
    setTimeout(() => {
      navigate('/my-projects')
      console.log('Timmeee')
    }, 8000)
  }
  const setUp = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()

    setSigner(signer)
    const address = await signer.getAddress()
    setSignerAddress(address)
    const campaignContract = new ethers.Contract(
      process.env.REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      signer,
    )

    setContract(campaignContract)
  }

  const CategoryArray = () => {
    return (
      <>
        <Grid padding={2} container>
          {categoryArray.map((category) => (
            <Chip
              style={{
                backgroundColor:
                  campaignCategory === category.index ? '#1c183c' : 'gray',

                color: 'white',
                margin: '5px',
              }}
              key={category.index}
              onClick={() => {
                setCampaignCategory(category.index)
                console.log(campaignCategory)
              }}
              label={category.name}
            />
          ))}
        </Grid>
      </>
    )
  }

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

  useEffect(() => {
    setUp()
  }, [])
  return (
    <div>
      <div className="form-root">
        <form
          onSubmit={(e) => {
            console.log(e)
            e.preventDefault()
          }}
        >
          <div className="form-row">
            <h3>Campaign Name</h3>
            <TextField
              style={{ backgroundColor: 'white' }}
              required
              onChange={(e) => setCampaignName(e.target.value)}
              className="form-text-field"
              placeholder="Campaign Name"
              type="text"
            />
          </div>
          <div className="form-row">
            <h3>Creator Name</h3>
            <TextField
              style={{ backgroundColor: 'white' }}
              required
              onChange={(e) => setCampaignCreator(e.target.value)}
              className="form-text-field"
              placeholder="Use your own name"
              type="text"
            />
          </div>
          <div className="form-row">
            <h3>Category</h3>
            <div>
              <CategoryArray />
            </div>
          </div>
          <div className="form-row">
            <h3>About Campaign</h3>
            <TextareaAutosize
              style={{ backgroundColor: 'white' }}
              required
              minRows={6}
              onChange={(e) => setCampaignDescription(e.target.value)}
              className="form-text-area"
              placeholder="About Campaign"
              type="text"
            />
          </div>
          <div className="form-row">
            <h3>Campaign Image</h3>
            <div style={{ width: '68%' }}>
              <Input
                style={{ backgroundColor: 'white' }}
                required
                inputProps={{ accept: 'image/*' }}
                onChange={(e) => {
                  handleImage(e)
                }}
                type="file"
              />
            </div>
          </div>

          <div
            style={{
              padding: '3%',
              textAlign: 'center',
            }}
            className="form-row"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',

                width: '100%',
              }}
            >
              {campaignImage ? (
                <a href={`https://ipfs.moralis.io:2053/ipfs/${campaignImage}`}>
                  https://ipfs.moralis.io:2053/ipfs/{campaignImage}
                </a>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <h3>Target Amount</h3>
            <TextField
              style={{ backgroundColor: 'white' }}
              required
              onChange={(e) => setCampaignAmount(e.target.value)}
              className="form-text-field"
              placeholder="Amount to raise in LIT"
              type="numeric"
            />
          </div>

          <div style={{ marginTop: '3%' }} className="form-row">
            <Button
              style={{ backgroundColor: '#8a83bc' }}
              onClick={() => {
                if (
                  user.get('ethAddress').toUpperCase() !==
                  signerAddress.toUpperCase()
                ) {
                  setErrorMessage('You are logged in with a different account!')
                } else if (
                  campaignName &&
                  campaignCreator &&
                  campaignImage &&
                  campaignAmount &&
                  campaignDescription
                ) {
                  setErrorMessage('')
                  setLoading(true)
                  submit()
                  console.log(
                    user.get('ethAddress'),
                    campaignCreator,
                    campaignName,
                    campaignDescription,
                    campaignImage,
                    campaignAmount,

                    campaignCategory.toString(),
                  )
                } else setErrorMessage('All fields are mandatory')
              }}
              variant="contained"
            >
              Create Campaign
            </Button>
          </div>
          <LinearProgress style={{ opacity: loading ? 1 : 0 }} />
          <h4 style={{ color: 'red' }}>{errorMessage}</h4>
        </form>
      </div>
    </div>
  )
}

export default CreateCampaign
