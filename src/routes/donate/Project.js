import { Card, Chip, Button, LinearProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import ProgressBar from '../../components/ProgressBar'
import './Project.css'
import { Link, Outlet } from 'react-router-dom'
import image from '../../charity.jpg'
import image2 from '../../charity2.jfif'
import image3 from '../../charity3.jpg'

const Project = ({ projectDetails, myProjects }) => {
  console.log('PEOZECT', projectDetails)
  const [progress, setProgress] = useState(
    (projectDetails.amountRaised / projectDetails.amountToRaise) * 100,
  )

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
    <>
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
            <h3 style={{ flex: 1 }}>{`${progress}%`}</h3>
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
              to={`${projectDetails.campaignID.toNumber()}`}
              state={projectDetails}
              className="project-link"
            >
              {!myProjects ? (
                <Button
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
    </>
  )
}

export default Project
