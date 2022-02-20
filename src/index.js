import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import About from './routes/about/About'
import Login from './routes/login/LoginLanding'
import Home from './routes/home/Home'
import PayToCharity from './routes/charities/PayToCharity'
import Admin from './Admin'

const loggedIn = false

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} />} />
          <Route path="/pay-to-charity" element={<PayToCharity />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
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
  </React.StrictMode>,
  document.getElementById('root'),
)
