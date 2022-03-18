import React, { useEffect, useState } from 'react'
import '../donate/Projects.css'
import Project from '../donate/Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'
import { Button, Divider, Grid, IconButton } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import AddIcon from '@mui/icons-material/Add'
import { Add } from '@mui/icons-material'

const MyProjects = () => {
  const [totalNumberOfCampaigns, setNumberOfCampaigns] = useState(0)
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()

  const { isAuthenticated, user } = useMoralis()

  const setup = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const campaignContract = new ethers.Contract(
      process.env.REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      provider,
    )
    setContract(campaignContract)
  }

  useEffect(() => {
    setup()
    console.log('setup done', contract)
  }, [])

  const getData = async () => {
    //setTimeout(getData, 1500)
    console.log('alive', contract)

    let numberOfProjects
    try {
      console.log(user.get('ethAddress'))
      numberOfProjects = await contract.campaignCounts(user.get('ethAddress'))
      setNumberOfCampaigns(() => numberOfProjects.toNumber())

      console.log(numberOfProjects.toNumber(), 'Now set')
    } catch (e) {
      //  setNumberOfCampaigns(0)
      console.log('Error fetching number of campaigns', e)
    }

    //   console.log('totalNumberOfCampaigns', totalNumberOfCampaigns)
    let allCampaigns = []
    for (let i = 1; i <= numberOfProjects; i++) {
      let campaign = await contract.userCampaigns(user.get('ethAddress'), i)
      console.log('yaw', campaign)
      allCampaigns.push(campaign)
    }
    setProjects(allCampaigns)
  }
  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 2000)
  }, [projects])

  const ProjectList = () => {
    return (
      <div className="projects-body">
        <Outlet />

        {window.location.pathname === '/my-projects' ? (
          <div style={{ margin: '2%' }}>
            <Link style={{ textDecoration: 'none' }} to="/my-projects/new">
              <Button startIcon={<AddIcon />} variant={'contained'}>
                Create New Campaign
              </Button>
            </Link>
          </div>
        ) : null}
        {window.location.pathname === '/my-projects' ? (
          <div>
            {projects.map((campaign) => (
              <Grid key={campaign.campaignID} item xs={2} sm={4} md={4}>
                <Project
                  myProjects
                  id={3}
                  key={campaign.campaignID}
                  projectDetails={campaign}
                />
              </Grid>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <>
      {location.pathname === '/projects' ||
      location.pathname === '/projects/my-projects' ? (
        <div className="projects-header">
          <h1>
            {location.pathname === '/projects' ? 'Campaigns!' : 'Your projects'}
          </h1>
          <h3>
            {location.pathname === '/projects'
              ? 'All running campaigns'
              : 'Start a Campaign and get funded'}
          </h3>
        </div>
      ) : null}

      <ProjectList />
    </>
  )
}

export default MyProjects
