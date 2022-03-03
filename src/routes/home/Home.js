import React, { useRef } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import '../../App.css'
import Logo from '../../components/Logo'
import CharityList from './CharityList'

export default function Home({ goToRef }) {
  const aboutRef = useRef()
  goToRef = aboutRef
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className="div-column">
          <p
            // onClick={() => {
            //   aboutRef.current.scrollIntoView({ behavior: 'smooth' })
            // }}
            className="App-main-heading"
          >
            Elixir
          </p>
          <p className="App-main-heading-small">A Blockchain based platform</p>
        </div>
        <div className="App-logo">
          <Logo />
        </div>
      </div>
      <div className="App-body">
        <div className="App-sections">
          <div ref={aboutRef} className="App-headings">
            About Us
          </div>
          <div className="App-paragraphs">
            We are the most trusted and powerful blockchain based platform. Use
            our token, Dona Coin to to donate to a cause that you care about.
            Every cause is supported by a trusted charity that will be verified
            by us
          </div>
        </div>
        <div className="App-sections" style={{ backgroundColor: '#eff7f6' }}>
          <div className="App-headings">Key Features</div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleOutlineIcon style={{ color: '#5AACA8' }} />
            <div
              className="App-headings"
              style={{ color: 'black', fontSize: '1rem' }}
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
            <CheckCircleOutlineIcon style={{ color: '#5AACA8' }} />
            <div
              className="App-headings"
              style={{ color: 'black', fontSize: '1rem' }}
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
            <CheckCircleOutlineIcon style={{ color: '#5AACA8' }} />
            <div
              className="App-headings"
              style={{ color: 'black', fontSize: '1rem' }}
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
            <CheckCircleOutlineIcon style={{ color: '#5AACA8' }} />
            <div
              className="App-headings"
              style={{ color: 'black', fontSize: '1rem' }}
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
          <div className="App-headings">Charities</div>
          <CharityList loggedIn />
        </div>
      </div>
    </div>
  )
}
