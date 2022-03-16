import React, { useEffect, useState } from 'react'
import './Projects.css'
import Project from './Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'
import { Button, Divider, Grid } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

const Projects = () => {
  const [totalNumberOfCampaigns, setNumberOfCampaigns] = useState(0)
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()

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

  const getNumberOfCampaigns = async () => {}

  const getData = async () => {
    //setTimeout(getData, 1500)
    let numberOfProjects
    try {
      numberOfProjects = await contract.numberOfCampaigns()
      setNumberOfCampaigns(() => numberOfProjects.toNumber())

      console.log(numberOfProjects.toNumber(), 'Now set')
    } catch (e) {
      //  setNumberOfCampaigns(0)
      console.log('Error fetching number of campaigns')
    }
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

    //   console.log('totalNumberOfCampaigns', totalNumberOfCampaigns)
    for (let i = 1; i <= numberOfProjects; i++) {
      let campaign = await contract.campaigns(i)
      //  console.log(campaign)
      switch (campaign.category) {
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
    // return allCampaigns
  }
  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 2000)
  }, [projects])

  const ProjectList = () => {
    return (
      <div className="projects-body">
        {projects.refugees && projects.refugees.length !== 0 ? (
          <div>
            <h1>Refugees</h1>

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.refugees.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={3}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.health && projects.health.length !== 0 ? (
          <div>
            <h1>Health</h1>
            <Grid
              numColumns={window.innerWidth < 600 ? 1 : 3}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.health.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={1}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.education && projects.education.length !== 0 ? (
          <div>
            <h1>Education</h1>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.education.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={2}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.poverty && projects.poverty.length !== 0 ? (
          <Grid>
            <h1>Poverty</h1>

            {projects.poverty.map((campaign) => (
              <Project
                id={1}
                key={campaign.campaignID}
                projectDetails={campaign}
              />
            ))}
          </Grid>
        ) : null}
      </div>
    )
  }
  return (
    <>
      <Outlet />
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
      {/* <Button
        onClick={() => {
          getData()
        }}
      >
        Add New
      </Button> */}

      {location.pathname === '/projects' ? <ProjectList /> : null}
    </>
  )
}

export default Projects
