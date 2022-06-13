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
            A truly decentralised fund-raising system using Blockchain
            technology which provides a transparent, safe, and a reliable
            platform for raising donations by reducing fraud and middle-party
            meddling.
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
            Donations cannot be falsified and are permanently recorded
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
            Adminless architecture
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
