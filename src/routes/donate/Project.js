import { Card, Chip, Button, LinearProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProgressBar from '../../components/ProgressBar'
import './Project.css'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { useMoralis } from 'react-moralis'

const Project = ({ projectDetails, myProjects }) => {
  const location = useLocation()
  console.log('PROZECT', projectDetails)
  const [progress, setProgress] = useState(
    (projectDetails.amountRaised / projectDetails.amountToRaise) * 100,
  )

  const { user } = useMoralis()

  const [over, isOver] = useState(false)
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="project-container">
        <Card
          style={{
            backgroundColor: '#9c94d1',
            border: 'white solid 3px',
          }}
          elevation={1}
          className="project-card"
        >
          <img
            src={`https://ipfs.moralis.io:2053/ipfs/${projectDetails.imageHash}`}
            alt="project"
            className="project-image"
          />
          <h3 className="project-campaign-name">
            {projectDetails.campaignName}
          </h3>

          {!myProjects ? (
            <h4 className="project-created-by">{`Created by ${projectDetails.ownerName}`}</h4>
          ) : null}

          {/* <Chip
          className="project-chip"
          color="secondary"
          label={projectDetails.category1}
        /> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <h3 style={{ flex: 1, margin: '5%' }}>{`${progress.toFixed(
              2,
            )}%`}</h3>
            <div
              style={{
                display: 'flex',
                flex: 5,
                margin: '2%',
                marginRight: '5%',
              }}
            >
              <ProgressBar progress={progress} />
            </div>
          </div>
          <p className="project-amount-raised">{`${
            projectDetails.amountRaised
          } ${!myProjects ? `LIT raised out` : `LIT received out of`} ${
            projectDetails.amountToRaise
          } LIT!`}</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '3%',
            }}
          >
            <Link
              to={`${
                user &&
                user.get('ethAddress').toUpperCase() !==
                  projectDetails.owner.toUpperCase()
                  ? projectDetails.campaignID.toNumber()
                  : '/projects'
              }`}
              state={projectDetails}
              className="project-link"
            >
              {location.pathname === '/projects' ? (
                <Button
                  elevation={0}
                  variant="contained"
                  style={{
                    marginBottom: '5%',
                    backgroundColor:
                      !user ||
                      (user &&
                        user.get('ethAddress').toUpperCase() ===
                          projectDetails.owner.toUpperCase())
                        ? 'transparent'
                        : '#231d50',
                    color:
                      !user ||
                      (user &&
                        user.get('ethAddress').toUpperCase() ===
                          projectDetails.owner.toUpperCase())
                        ? '#807aae'
                        : 'white',
                  }}
                  disabled={
                    !user ||
                    (user &&
                      user.get('ethAddress').toUpperCase() ===
                        projectDetails.owner.toUpperCase())
                  }
                  onClick={() => {
                    console.log(':(')
                  }}
                >
                  Donate
                </Button>
              ) : null}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Project
