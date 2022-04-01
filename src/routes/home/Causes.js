import {
  ImageList,
  ImageListItem,
  Card,
  Typography,
  ImageListItemBar,
} from '@mui/material'
import React from 'react'
import Cause from '../../components/Cause'

export default function Causes() {
  let charities = [
    {
      name: 'Health',
    },
    {
      name: 'Refugees',
    },
    {
      name: 'Education',
    },
    {
      name: 'Hunger',
    },
    {
      name: 'Poverty',
    },
    {
      name: 'Nature',
    },
    {
      name: 'Personal Projects',
    },
    {
      name: 'Other',
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
            <Cause path={'/pay-to-charity'} charityName={item.name} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
