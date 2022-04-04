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
          style={{ backgroundColor: over ? '#EEF4F8' : null }}
          // onMouseEnter={() => isOver(true)}
          // onMouseLeave={() => isOver(false)}
          elevation={1}
          className="project-card"
        >
          <img
            src={`https://ipfs.moralis.io:2053/ipfs/${projectDetails.imageHash}`}
            alt="project"
            className="project-image"
          />
          <h3>{projectDetails.campaignName}</h3>
          {!myProjects ? (
            <h4>{`Created by ${projectDetails.ownerName}`}</h4>
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
            <h3 style={{ flex: 1 }}>{`${progress.toFixed(2)}%`}</h3>
            <div
              style={{
                display: 'flex',
                flex: 4,
                margin: '2%',
              }}
            >
              <ProgressBar progress={progress} />
            </div>
          </div>
          <h4>{`${projectDetails.amountRaised} ${
            !myProjects ? `LIT raised out` : `LIT received out of`
          } ${projectDetails.amountToRaise} LIT!`}</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '3%',
            }}
          >
            <Link
              to={`${
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
                  disabled={
                    user.get('ethAddress').toUpperCase() ===
                    projectDetails.owner.toUpperCase()
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
