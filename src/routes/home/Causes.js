import {
  ImageList,
  ImageListItem,
  Card,
  Typography,
  ImageListItemBar,
} from '@mui/material'
import React from 'react'
import Cause from '../../components/Cause'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import NightShelterIcon from '@mui/icons-material/NightShelter'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SchoolIcon from '@mui/icons-material/School'
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman'
import ForestIcon from '@mui/icons-material/Forest'
import PsychologyIcon from '@mui/icons-material/Psychology'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import useWindowDimensions from '../../components/useWindowDimensions'

export default function Causes() {
  const { width, height } = useWindowDimensions()
  let charities = [
    {
      name: 'Health',
      icon: <LocalHospitalIcon color="#1c183c" />,
    },
    {
      name: 'Refugees',
      icon: <NightShelterIcon color="#1c183c" />,
    },
    {
      name: 'Education',
      icon: <SchoolIcon color="#1c183c" />,
    },
    {
      name: 'Hunger',
      icon: <RestaurantIcon color="#1c183c" />,
    },
    {
      name: 'Poverty',
      icon: <ElderlyWomanIcon color="#1c183c" />,
    },
    {
      name: 'Nature',
      icon: <ForestIcon color="#1c183c" />,
    },
    {
      name: 'Personal',
      icon: <PsychologyIcon color="#1c183c" />,
    },
    {
      name: 'Other',
      icon: <MonetizationOnIcon color="#1c183c" />,
    },
  ]
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <ImageList
        style={{
          width: '40%',
          justifyContent: 'center',
        }}
        cols={width < 600 ? 1 : 2}
        rowHeight={110}
      >
        {charities.map((item) => (
          <ImageListItem>
            <Cause
              icon={item.icon}
              path={'/pay-to-charity'}
              charityName={item.name}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
