import './App.css'
import AppTopBar from './components/AppTopBar'

import Logo from './components/Logo'
import { Outlet, useLocation } from 'react-router-dom'
import Home from './routes/home/Home'
import { useState } from 'react'

const App = () => {
  const [current, setCurrent] = useState(0)
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className="App">
      <div className="App-header">
        <AppTopBar />
        <Outlet />
        {location.pathname == '/' ? <Home /> : null}
        {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
      </style> */}
      </div>
    </div>
  )
}

export default App
