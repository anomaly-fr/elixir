import './App.css'
import AppTopBar from './components/AppTopBar'

import Logo from './components/Logo'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <AppTopBar />
        <Outlet />

        {/* <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
      </style> */}
      </div>
    </div>
  )
}

export default App
