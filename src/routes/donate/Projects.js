import React, { useEffect, useState, useLayoutEffect } from 'react'
import './Projects.css'
import Project from './Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'
import { Button, Divider, Grid, LinearProgress } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import useWindowDimensions from '../../components/useWindowDimensions'

const Projects = () => {
  const [totalNumberOfCampaigns, setNumberOfCampaigns] = useState(-1)
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()
  const [loading, setLoading] = useState(true)
  const { width } = useWindowDimensions()

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
    console.log('here', contract)
  }, [])

  const getData = async () => {
    //setTimeout(getData, 1500)
    let numberOfProjects
    try {
      numberOfProjects = await contract.numberOfCampaigns()
      setNumberOfCampaigns(() => numberOfProjects.toNumber())
    } catch (e) {
      //  setNumberOfCampaigns(0)
      console.log(contract, 'again')
      console.log('Error fetching number of campaigns', e)
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

    for (let i = 1; i <= numberOfProjects; i++) {
      let campaign = await contract.campaigns(i)
      switch (campaign.category) {
        case '1':
          allCampaigns.health.push(campaign)
          break
        case '2':
          allCampaigns.refugees.push(campaign)
          break
        case '3':
          allCampaigns.education.push(campaign)
          break
        case '4':
          allCampaigns.hunger.push(campaign)
          break
        case '5':
          allCampaigns.poverty.push(campaign)
          break
        case '6':
          allCampaigns.nature.push(campaign)
          break
        case '7':
          allCampaigns.personal.push(campaign)
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
      getData().then(() => {
        if (totalNumberOfCampaigns > -1) {
          setTimeout(() => {
            setLoading(false)
          }, 100)
        }
      })
    }, 2000)
    return () => {}
  }, [projects])

  const ProjectList = () => {
    if (totalNumberOfCampaigns === 0) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: '#0b111b',
          }}
        >
          <h2>Such Empty!</h2>
        </div>
      )
    }

    return (
      <div className="projects-body">
        {projects.health && projects.health.length !== 0 ? (
          <div className="projects-div">
            <h1>Health</h1>
            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
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
          <div className="projects-div">
            <h1>Education</h1>
            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.education.map((campaign) => (
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

        {projects.refugees && projects.refugees.length !== 0 ? (
          <div className="projects-div">
            <h1>Refugees</h1>

            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.refugees.map((campaign) => (
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
        {projects.hunger && projects.hunger.length !== 0 ? (
          <div className="projects-div">
            <h1>Hunger</h1>
            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.hunger.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={4}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.poverty && projects.poverty.length !== 0 ? (
          <div className="projects-div">
            <h1>Poverty</h1>
            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.poverty.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={4}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.nature && projects.nature.length !== 0 ? (
          <div className="projects-div">
            <h1>Nature</h1>

            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.nature.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={6}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.personal && projects.personal.length !== 0 ? (
          <div className="projects-div">
            <h1>Personal Project</h1>

            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.personal.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={7}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}

        {projects.other && projects.other.length !== 0 ? (
          <div className="projects-div">
            <h1>Other</h1>

            <Grid
              numColumns={width < 600 ? 1 : 3}
              container
              direction={width < 600 ? 'column' : 'row'}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.other.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project
                    id={8}
                    key={campaign.campaignID}
                    projectDetails={campaign}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}
      </div>
    )
  }
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
  if (!window.ethereum) {
    return (
      <div className="no-metamask">
        <h1>You need Metamask to see this page!</h1>
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
            {location.pathname === '/projects' ? 'CAMPAIGNS!' : 'Your projects'}
          </h1>
          {/* <h3>
            {location.pathname === '/projects'
              ? 'All running campaigns'
              : 'Start a Campaign and get funded'}
          </h3> */}
        </div>
      ) : null}
      {/* <Button
        onClick={() => {
          getData()
        }}
      >
        Add New
      </Button> */}

      {location.pathname === '/projects' ? (
        <div style={{ backgroundColor: 'red' }}>
          {loading ? <LinearProgress /> : null}
          <ProjectList />
        </div>
      ) : null}
    </>
  )
}

export default Projects
