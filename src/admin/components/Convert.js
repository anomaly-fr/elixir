import { TextField, Card, Button } from '@mui/material'
import React, { useState } from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import useWindowDimensions from '../../components/useWindowDimensions'
const EXCHANGE_RATE = 100

export default function Convert() {
  const [LITFirst, isLITFirst] = useState(true)
  const [value, setValue] = useState(1)
  const { width } = useWindowDimensions()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '5%',
      }}
    >
      <Card
        style={{
          width: width > 700 ? '40%' : '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          id="filled-basic"
          variant="filled"
          label={LITFirst ? 'LIT' : 'INR'}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <TextField
          label={LITFirst ? 'INR' : 'LIT'}
          id="filled-basic"
          variant="filled"
          value={LITFirst ? LITToINR(value) : INRToLIT(value)}
        />
        <Button
          style={{ backgroundColor: '#1c183c', margin: '5%' }}
          variant="contained"
          endIcon={<CompareArrowsIcon />}
          onClick={() => isLITFirst(!LITFirst)}
        >
          Flip
        </Button>{' '}
      </Card>
    </div>
  )
}
const LITToINR = (value) => {
  // 1 LIT=100INR
  return value * EXCHANGE_RATE
}
const INRToLIT = (value) => {
  // 1 INR=0.01
  return value / EXCHANGE_RATE
}
