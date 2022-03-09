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
import { MoralisProvider } from 'react-moralis'
import Me from './profile/Me'

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
