import React, { useEffect } from 'react'
import './CreateCampaign.css'
import { Button, Chip, Input, TextareaAutosize, TextField } from '@mui/material'
import { useState } from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis'
import CampaignsAbi from '../../CampaignsAbi.json'
import { ethers } from 'ethers'
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

  const { user } = useMoralis()

  const { saveFile } = useMoralisFile()

  let categoryArray = [
    { index: 1, name: 'health' },
    { index: 2, name: 'refugees' },
    { index: 3, name: 'education' },
    { index: 4, name: 'hunger' },
    { index: 5, name: 'poverty' },
    { index: 6, name: 'nature' },
    { index: 7, name: 'other' },
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
    alert('DoNe dEaL')
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
        {categoryArray.map((category) => (
          <Chip
            style={{
              backgroundColor:
                campaignCategory === category.index ? 'purple' : 'gray',
            }}
            key={category.index}
            onClick={() => {
              setCampaignCategory(category.index)
              console.log(campaignCategory)
            }}
            label={category.name}
          />
        ))}
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
              required
              onChange={(e) => setCampaignCreator(e.target.value)}
              className="form-text-field"
              placeholder="Use your own name"
              type="text"
            />
          </div>
          <div className="form-row">
            <h3>Category</h3>
            <CategoryArray />
          </div>
          <div className="form-row">
            <h3>About Campaign</h3>
            <TextareaAutosize
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
            <Input
              required
              inputProps={{ accept: 'image/*' }}
              onChange={(e) => {
                handleImage(e)
              }}
              type="file"
            />
          </div>
          {/* <div
            style={{
              backgroundColor: '#f5f5f5',
            }}
          >
            {campaignImage ? (
              <img
                className="form-image"
                src={`https://ipfs.moralis.io:2053/ipfs/${campaignImage}`}
                alt="campaignImage"
              />
            ) : null}
          </div> */}

          <div
            style={{
              padding: '3%',
              textAlign: 'center',
            }}
            className="form-row"
          >
            {campaignImage ? (
              <a href={`https://ipfs.moralis.io:2053/ipfs/${campaignImage}`}>
                https://ipfs.moralis.io:2053/ipfs/{campaignImage}
              </a>
            ) : null}
          </div>

          <div className="form-row">
            <h3>Target Amount</h3>
            <TextField
              required
              onChange={(e) => setCampaignAmount(e.target.value)}
              className="form-text-field"
              placeholder="Amount to raise in LIT"
              type="numeric"
            />
          </div>
          <div
            style={{
              alignItem: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              margin: '2%',
            }}
          >
            <Button
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
              color="primary"
            >
              Create Campaign
            </Button>
            <h4 style={{ color: 'red' }}>{errorMessage}</h4>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCampaign
