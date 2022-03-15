import React, { useEffect, useState } from 'react'
import './Donate.css'
import Project from './Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'
import { Button, Divider } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import { HorizontalRule } from '@mui/icons-material'

const Donate = () => {
  const [numberOfCampaigns, setNumberOfCampaigns] = useState(0)
  let campaigns = []
  const campaignstest = [
    {},
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
    {
      campaignID: 3,
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
      campaignID: 4,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Ukraine Refugees',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 20,
      amountRaised: 15,
      targetReached: false,
      category1: 'refugees',
    },
    {
      campaignID: 1,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Save the children',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 10,
      amountRaised: 2,
      targetReached: false,
      category1: 'nature',
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
      category1: 'hunger',
    },
    {
      campaignID: 3,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Save the children',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 10,
      amountRaised: 2,
      targetReached: false,
      category1: 'education',
    },
    {
      campaignID: 4,
      owner: '0x0CA65e2fF354dB324c0eD99BD008cea231a9b9B3',
      campaignName: 'Ukraine Refugees',
      aboutHash: '#####',
      imageHash: '#####',
      amountToRaise: 20,
      amountRaised: 15,
      targetReached: false,
      category1: 'education',
    },
  ]

  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()
  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const campaignContract = new ethers.Contract(
      REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      provider,
    )
    setContract(campaignContract)

    const numberOfProjects = await contract.numberOfCampaigns()

    setNumberOfCampaigns(() => numberOfProjects.toNumber())

    const categories = [
      'health',
      'refugees',
      'education',
      'hunger',
      'poverty',
      'nature',
      'personal project',
      'other',
    ]

    let allCampaigns = {
      health: [],
      refugees: [],
      education: [],
      hunger: [],
      poverty: [],
      nature: [],
      personal: [],
      other: [],
    }

    let campaigns = []
    for (let i = 1; i <= numberOfProjects; i++) {
      let campaign = await contract.campaigns(i)
      switch (campaign.category1) {
        case 'health':
          allCampaigns.health.push(campaign)
          break
        case 'refugees':
          allCampaigns.refugees.push(campaign)
          break
        case 'education':
          allCampaigns.education.push(campaign)
          break
        case 'hunger':
          allCampaigns.hunger.push(campaign)
          break
        case 'poverty':
          allCampaigns.poverty.push(campaign)
          break
        case 'nature':
          allCampaigns.nature.push(campaign)
          break
        case 'personal':
          allCampaigns.personal.push(campaign)
          break
        case 'other':
          allCampaigns.other.push(campaign)
          break
        default:
          allCampaigns.other.push(campaign)
      }
    }

    setProjects(allCampaigns)
  }
  useEffect(() => {
    getData()
  }, [contract])

  const { REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS } = process.env
  const ProjectList = () => {
    return (
      <div className="donate-body">
        {projects.refugees.length !== 0 ? (
          <div>
            <h1>Refugees</h1>

            {projects.refugees.map((campaign) => (
              <Project projectDetails={campaign} />
            ))}
          </div>
        ) : null}

        {projects.health.length !== 0 ? (
          <>
            <h1>Health</h1>
            <div style={{ display: 'flex' }}>
              {projects.health.map((campaign) => (
                <Project projectDetails={campaign} />
              ))}
            </div>
          </>
        ) : null}

        {projects.education.length !== 0 ? (
          <div>
            <h1>Education</h1>

            {projects.education.map((campaign) => (
              <Project projectDetails={campaign} />
            ))}
          </div>
        ) : null}

        <Divider orientation="vertical" flexItem />
      </div>
    )
  }
  return (
    <>
      <div className="donate-header">
        <h1>
          {location.pathname === '/projects' ? 'Projects' : 'Your projects'}
        </h1>
        <h3>
          {location.pathname === '/projects'
            ? 'Donate to a good cause'
            : 'Start a Campaign and get funded'}
        </h3>
      </div>
      <Outlet />
      {location.pathname === '/projects' ? <ProjectList /> : null}
    </>
  )
}

export default Donate
