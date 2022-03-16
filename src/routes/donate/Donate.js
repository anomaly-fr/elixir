import { React, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Avatar, Button, TextField } from '@mui/material'
import image from '../../charity.jpg'
import './Donate.css'
import ProgressBar from '../../components/ProgressBar'

const Donate = () => {
  const location = useLocation()
  console.log('This', location.state)
  const project = location.state
  let amountRaised = parseInt(project.amountRaised._hex)
  let amountToRaise = parseInt(project.amountToRaise._hex)

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1
        // align="center"
        // fontSize={20}
        // fontFamily={'Poppins'}
        className="donate-heading"
      >
        {project.campaignName}
      </h1>
      <img className="donate-image" src={image} alt="project" />
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '95%',
        }}
      >
        <div className="by">
          <Avatar>{project.ownerName.charAt(0)}</Avatar>
          <h3>{`By ${project.ownerName}`}</h3>
        </div>

        <p
          style={{ fontWeight: 'bold', fontSize: '1.5rem', padding: '0%' }}
          className="about"
        >{`${amountRaised} LIT raised out of ${amountToRaise} LIT`}</p>
        <ProgressBar progress={24} />
        <p className="about">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1%',
            backgroundColor: '#EEF4F8',
          }}
        >
          <TextField
            inputMode="numeric"
            style={{ padding: '2%' }}
            id="outlined-basic"
            placeholder="Amount in LIT"
            variant="outlined"
          />
          <Button variant="contained" color="primary">
            Contribute Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Donate
