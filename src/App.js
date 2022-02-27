import './App.css'
import AppTopBar from './components/AppTopBar'

import { Outlet, useLocation } from 'react-router-dom'
import Home from './routes/home/Home'

const App = () => {
  const location = useLocation()

  return (
    <div className="App">
      <div className="App-header">
        <AppTopBar
          about={() => {
            window.scrollTo(10, 400)
          }}
        />
        <Outlet />
        {location.pathname === '/' ? <Home /> : null}
      </div>
    </div>
  )
}

export default App
