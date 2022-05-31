import React, { useEffect, useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'
import { useMoralis } from 'react-moralis'
import useWindowDimensions from './useWindowDimensions'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, List, ListItem, ListItemText, Drawer } from '@mui/material'
import logo from '../logo.png'

const AppTopBar = () => {
  const [state, setState] = React.useState(false)

  const { isAuthenticated, user, logout } = useMoralis()

  const { height, width } = useWindowDimensions()
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <Link
            style={{
              textDecoration: 'none',
              color: '#231d50',
            }}
            className="link"
            to="/"
          >
            <ListItemText>Home</ListItemText>
          </Link>
        </ListItem>

        <ListItem button>
          <Link className="link" to="/projects">
            <ListItemText>Donate</ListItemText>
          </Link>
        </ListItem>
        <ListItem>
          <Link className="link" to="/my-projects">
            <ListItemText>My Projects</ListItemText>
          </Link>
        </ListItem>

        <ListItem button>
          <Link className="link" to="/login">
            <ListItemText>Connect</ListItemText>
          </Link>
        </ListItem>

        <ListItem button>
          <Link className="link" to="/login">
            {isAuthenticated ? (
              <ListItemText onClick={logout}>Logout</ListItemText>
            ) : null}
          </Link>
        </ListItem>
      </List>
    </Box>
  )
  return (
    <div className="App-top-bar">
      <div>
        <img className="icon" src={logo} />
      </div>

      <div className="empty" />
      {width <= 700 ? (
        <div>
          {['right'].map((anchor) => (
            <React.Fragment>
              <MenuIcon key={anchor} onClick={toggleDrawer(anchor, true)} />
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="App-top-bar-menu">
          <Link className="link" to="/">
            <MenuButton title={'Home'} />
          </Link>
          <Link className="link" to="/projects">
            <MenuButton title={'Donate'} />
          </Link>
          <Link
            className="link"
            to={'/my-projects'}
            //    state={projects}
          >
            <MenuButton title={'My Projects'} />
          </Link>
          <Link className="link" to="/login">
            <MenuButton title={'Connect'} />
          </Link>
          <Link className="link" to="/login">
            {isAuthenticated ? <MenuButton title={'Logout'} /> : null}
          </Link>
        </div>
      )}
    </div>
  )
}

export default AppTopBar
