import React, { useEffect, useState } from 'react'
import '../donate/Projects.css'
import Project from '../donate/Project'
import { ethers } from 'ethers'
import CampaignsAbi from '../../CampaignsAbi.json'
import {
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
} from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import AddIcon from '@mui/icons-material/Add'
import useWindowDimensions from '../../components/useWindowDimensions'

const MyProjects = () => {
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()
  const [loading, setLoading] = useState(true)

  const { isAuthenticated, user } = useMoralis()
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
    setup().then(() => {
      console.log('setup done', contract)
    })
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

  useEffect(() => {
    const getData = async () => {
      try {
        let campaigns = []
        campaigns = await contract.getUserCampaigns(user.get('ethAddress'))
        setProjects(campaigns)

        console.log('Contract', contract)
      } catch (e) {
        console.log('error contract no set :(', e)
      }
    }
    setTimeout(() => {
      getData()
      if (projects) {
        setLoading(false)
      }
    }, 2000)
  }, [contract, projects])

  const ProjectList = () => {
    // console.log(window.location.pathname)
    return (
      <div className="projects-body">
        <Outlet />

        {window.location.pathname === '/my-projects' ? (
          <div style={{ margin: '2%' }}>
            <Link
              style={{ textDecoration: 'none' }}
              to={isAuthenticated ? '/my-projects/new' : '/login'}
            >
              <Button startIcon={<AddIcon />} variant={'contained'}>
                Create New Campaign
              </Button>
            </Link>
          </div>
        ) : null}
        {window.location.pathname === '/my-projects' ? (
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LinearProgress style={{ opacity: loading ? 1 : 0 }} />
            <Grid
              direction={width > 600 ? 'row' : 'column'}
              numColumns={width < 600 ? 1 : 3}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.length === 0 ? (
                <h2>Such Empty!</h2>
              ) : (
                projects.map((campaign) => (
                  <Grid item xs={2} sm={4} md={4}>
                    <Project myProjects projectDetails={campaign} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        ) : null}
      </div>
    )
  }
  if (!window.ethereum) {
    return (
      <div className="no-metamask">
        <h1>You need Metamask to see this page!</h1>
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
