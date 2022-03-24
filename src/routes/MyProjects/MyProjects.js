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

const MyProjects = () => {
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()
  const [loading, setLoading] = useState(true)

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
    setup().then(() => {
      console.log('setup done', contract)
    })
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

  useEffect(() => {
    const getData = async () => {
      console.log('got')
      try {
        let campaigns = []
        campaigns = await contract.getUserCampaigns(user.get('ethAddress'))
        setProjects(campaigns)

        console.log('Contract', contract)
      } catch (e) {
        console.log('error contract no set :(', e)
      }
      // setProjects([...projects])

      // getData()

      //   console.log('totalNumberOfCampaigns', totalNumberOfCampaigns)
    }
    setTimeout(() => {
      getData()
      if (projects) {
        setLoading(false)
      }

      console.log('AGAIN')
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
          <div>
            <LinearProgress style={{ opacity: loading ? 1 : 0 }} />
            {projects.length === 0 ? (
              <div>Such Empty!</div>
            ) : (
              projects.map((campaign) => (
                <Grid item xs={2} sm={4} md={4}>
                  <Project myProjects projectDetails={campaign} />
                </Grid>
              ))
            )}
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
