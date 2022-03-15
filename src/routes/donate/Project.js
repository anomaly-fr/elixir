import { Card, Chip, Button, LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import ProgressBar from '../../components/ProgressBar'
import './Project.css'
const Project = ({ projectDetails }) => {
  const [progress, setProgress] = useState(
    (projectDetails.amountRaised / projectDetails.amountToRaise) * 100,
  )
  const [over, isOver] = useState(false)

  return (
    <div className="project-container">
      <Card
        style={{ backgroundColor: over ? '#EEF4F8' : null }}
        onMouseEnter={() => isOver(true)}
        onMouseLeave={() => isOver(false)}
        elevation={1}
        className="project-card"
      >
        <h3>{projectDetails.campaignName}</h3>
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
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', margin: '3%' }}
        >
          <Button variant="contained" fullWidth={false}>
            Donor
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Project
