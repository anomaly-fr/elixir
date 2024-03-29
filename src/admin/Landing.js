import React from 'react'
import Logo from '../components/Logo'
import '../App.css'
import PropTypes from 'prop-types'
import { Box, Typography, Tab, Tabs, Card } from '@mui/material'
import Convert from './components/Convert'
import Transfer from './components/Transfer'
import Balance from './components/Balance'

const menuItems = ['Convert', 'Transfer', 'Check Balance']
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Landing = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className="lit-portal-header">
          <p className="lit-portal-heading">ELIXIR - LIT Portal</p>
        </div>
        {/* <div className="App-logo">
          <Logo />
        </div> */}
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            style={{ backgroundColor: 'white', color: 'white' }}
            centered
            // textColor="#9cf5ed"
            // indicatorColor="#9cf5ed"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {menuItems.map((item, index) => {
              console.log(item)
              return <Tab label={item} {...a11yProps(index)} />
            })}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Convert />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Transfer
            contractAddress={process.env.REACT_APP_ETH_CONTACT_ADDRESS}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Balance
            contractAddress={process.env.REACT_APP_ETH_CONTACT_ADDRESS}
          />
        </TabPanel>
      </Box>
    </div>
  )
}

export default Landing
