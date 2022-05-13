import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import '../../App.css'
import logo from '../../charity-blocks-logo.png'
import Causes from './Causes'
import useWindowDimensions from '../../components/useWindowDimensions'

export default function Home() {
  const { width, height } = useWindowDimensions()
  return (
    <div>
      <div className="App-home-header">
        <div className="div-column">
          <div className="App-main-heading">ELIXIR</div>
          <div className="App-main-heading-small">
            A Blockchain based platform
          </div>
        </div>
        {width > 600 ? (
          <div className="App-logo">
            <img src={logo} />
          </div>
        ) : null}
      </div>
      <div className="App-body">
        <div className="App-sections">
          <div className="App-headings">ABOUT US</div>
          <div className="App-paragraphs">
            We are the most trusted and powerful blockchain based platform. Use
            our token, LIT to to donate to a campaign that you care about. Every
            cause is supported by a trusted charity that will be verified by us
          </div>
        </div>
        <div className="App-features-sections">
          <div className="App-headings" style={{ color: '#7263cf' }}>
            FEATURES
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon style={{ color: '#7263cf' }} />
            <div
              className="App-headings"
              style={{ color: 'white', fontSize: '1rem' }}
            >
              Increased Transparencey
            </div>
          </div>

          <div
            className="App-paragraphs"
            style={{ fontWeight: 'normal', padding: '1%' }}
          >
            Donors can easily track the impact of their contributions
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon style={{ color: '#7263cf' }} />
            <div
              className="App-headings"
              style={{ color: 'white', fontSize: '1rem' }}
            >
              Quick Donations
            </div>
          </div>

          <div
            className="App-paragraphs"
            style={{ fontWeight: 'normal', padding: '1%' }}
          >
            The simplest and quickest way to make donations
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon style={{ color: '#7263cf' }} />
            <div
              className="App-headings"
              style={{ color: 'white', fontSize: '1rem' }}
            >
              Immutable Structure
            </div>
          </div>

          <div
            className="App-paragraphs"
            style={{ fontWeight: 'normal', padding: '1%' }}
          >
            Donations cannot be falsified and are permanently recorded for
            donors to see{' '}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon style={{ color: '#7263cf' }} />
            <div
              className="App-headings"
              style={{ color: 'white', fontSize: '1rem' }}
            >
              Decentralized Network{' '}
            </div>
          </div>

          <div
            className="App-paragraphs"
            style={{ fontWeight: 'normal', padding: '1%' }}
          >
            The number of middlemen between donors and beneficiaries is brought
            to a minimum{' '}
          </div>
        </div>
        {}
        <div className="App-sections">
          <div className="App-headings">DONATE TO CAUSES</div>
          <Causes />
        </div>
      </div>
    </div>
  )
}
