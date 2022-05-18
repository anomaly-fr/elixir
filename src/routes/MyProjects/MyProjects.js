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
import { Link, useLocation } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import AddIcon from '@mui/icons-material/Add'
import useWindowDimensions from '../../components/useWindowDimensions'

const MyProjects = () => {
  const [projects, setProjects] = useState([])
  const [contract, setContract] = useState()
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
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
        console.log('error contract not set :(', e)
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
    return (
      <div className="myprojects-body">
        <div>
          <div>
            {!window.ethereum ? (
              <h1 style={{ display: 'flex', justifyContent: 'center' }}>
                You need Metamask to view this site{' '}
              </h1>
            ) : (
              <div className="myprojects-top">
                <Link
                  style={{ textDecoration: 'none' }}
                  to={isAuthenticated ? '/my-projects/new' : '/login'}
                >
                  <Button
                    style={{ backgroundColor: '#8a83bc' }}
                    startIcon={<AddIcon />}
                    variant={'contained'}
                  >
                    Create New Campaign
                  </Button>
                </Link>
              </div>
            )}
            <LinearProgress style={{ opacity: loading ? 1 : 0 }} />
          </div>

          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid
              direction={width > 600 ? 'row' : 'column'}
              numColumns={width < 600 ? 1 : 3}
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {projects.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    padding: '1%',
                  }}
                ></div>
              ) : (
                projects.map((campaign) => (
                  <Grid item xs={2} sm={4} md={4}>
                    <Project myProjects projectDetails={campaign} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProjectList />
    </div>
  )
}

export default MyProjects
