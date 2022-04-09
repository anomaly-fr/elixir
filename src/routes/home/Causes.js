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
      icon: <LocalHospitalIcon />,
    },
    {
      name: 'Refugees',
      icon: <NightShelterIcon />,
    },
    {
      name: 'Education',
      icon: <SchoolIcon />,
    },
    {
      name: 'Hunger',
      icon: <RestaurantIcon />,
    },
    {
      name: 'Poverty',
      icon: <ElderlyWomanIcon />,
    },
    {
      name: 'Nature',
      icon: <ForestIcon />,
    },
    {
      name: 'Personal Projects',
      icon: <PsychologyIcon />,
    },
    {
      name: 'Other',
      icon: <MonetizationOnIcon />,
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
      <ImageList cols={width < 600 ? 1 : 2} rowHeight={60}>
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
