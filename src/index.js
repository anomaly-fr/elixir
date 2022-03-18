import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import About from './routes/about/About'
import ConnectWallet from './routes/connect/ConnectWallet'
import Home from './routes/home/Home'
import PayToCharity from './routes/charities/PayToCharity'
import Landing from './admin/Landing'
import MyProjects from './routes/MyProjects/MyProjects'
import { MoralisProvider } from 'react-moralis'
import Me from './profile/Me'
import Projects from './routes/donate/Projects'
import Donate from './routes/donate/Donate'
import CreateCampaign from './routes/donate/CreateCampaign'

const loggedIn = false

const applicationID = '07z6U5ipLv5MMsTlziNN4F6Cme2WcqYVDaClT7ID'
const serverURL = 'https://wxsne1sy4nz5.usemoralis.com:2053/server'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverURL} appId={applicationID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<ConnectWallet />} />
            <Route path="/pay-to-charity" element={<PayToCharity />} />
            <Route path="/profile" element={<Me />} />
            <Route path="/projects" element={<Projects />}>
              <Route path="/projects/:projectID" element={<Donate />} />
            </Route>
            <Route path="/my-projects" element={<MyProjects />}>
              <Route path="/my-projects/new" element={<CreateCampaign />} />
            </Route>
          </Route>

          <Route path="/admin" element={<Landing />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 100,
                  display: 'flex',
                }}
              >
                404 :(
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
