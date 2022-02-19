import {
  ImageList,
  ImageListItem,
  Card,
  Typography,
  ImageListItemBar,
} from '@mui/material'
import React from 'react'
import Charity from '../components/Charity'

export default function CharityList({ loggedIn }) {
  console.log('Cl ' + loggedIn)
  let charities = [
    {
      name: 'Helping Hands',
    },
    {
      name: 'In Need',
    },
    {
      name: 'Magical Helpers',
    },
    {
      name: 'Helping Hands',
    },
    {
      name: 'In Need',
    },
    {
      name: 'Magical Helpers',
    },
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ImageList cols={3} rowHeight={164}>
        {charities.map((item) => (
          <ImageListItem>
            <Charity path={'/pay-to-charity'} charityName={item.name} />
            <ImageListItemBar position="below" title={item.name} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
