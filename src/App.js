import './App.css'
import AppTopBar from './components/AppTopBar'
import Paper from '@mui/material/Paper'
import logo from './charity-blocks-logo.png'
import Logo from './components/Logo'
import { Typography } from '@mui/material'
import { flexbox } from '@mui/system'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <AppTopBar />

        {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
      </style> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div className="div-column">
            <p className="App-main-heading">Charity Blocks</p>
            <p className="App-main-heading-small">
              A Blockchain based charity platform
            </p>
          </div>
          <div className="App-logo">
            <Logo />
          </div>
        </div>
      </div>

      <div className="App-body">
        <div className="App-sections">
          <div className="App-headings">About us</div>
          <div className="App-paragraphs">
            We are the most trusted and powerful blockchain based charity
            platform. Use our cryptocurrency, Dona Coin to to donate to a cause
            that you care about. Every cause is supported by a trusted charity
            that will be verified by us
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
      </div>
    </div>
  )
}

export default App
