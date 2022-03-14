import React, { useEffect, useState } from 'react'
import './Donate.css'
import Project from './Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'

const Donate = () => {
  const [numberOfCampaigns, setNumberOfCampaigns] = useState(-1)
  const campaigns = [
    {
      campaignID: 1,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Save the children',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 10,
      amountRaised: 2,
      targetReached: false,
      category1: 'health',
    },
    {
      campaignID: 2,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Ukraine Refugees',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 20,
      amountRaised: 15,
      targetReached: false,
      category1: 'refugees',
    },
  ]

  const [projects, setProjects] = useState(campaigns)
  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const campaigns = new ethers.Contract(
      REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      provider,
    )
    console.log('providerrr', campaigns)
    const numberOfProjects = await campaigns.numberOfCampaigns()
    console.log('Number of projects', numberOfProjects.toNumber())
    setNumberOfCampaigns(() => numberOfProjects)
    const project = await campaigns.campaigns(1)
    console.log('project', project)
    setProjects(project)
  }
  useEffect(() => {
    console.log('getting')
    getData()
  }, [])

  const { REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS } = process.env

  return (
    <>
      <div className="donate-header">
        <h1>Projects</h1>
        <h3>Donate to a good cause</h3>
      </div>
      <div className="donate-body"></div>
      {campaigns.map((campaign) => (
        <Project projectDetails={campaign} />
      ))}
    </>
  )
}

export default Donate
