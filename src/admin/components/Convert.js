import { TextField, Card, Button } from '@mui/material'
import React, { useState } from 'react'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
const EXCHANGE_RATE = 100

export default function Convert() {
  const [DCFirst, isDCFirst] = useState(true)
  const [value, setValue] = useState(1)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '5%',
      }}
    >
      <Card className="box">
        <TextField
          id="filled-basic"
          variant="filled"
          label={DCFirst ? 'DC' : 'INR'}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <TextField
          label={DCFirst ? 'INR' : 'DC'}
          id="filled-basic"
          variant="filled"
          value={DCFirst ? DCToINR(value) : INRToDC(value)}
        />
        <Button
          style={{ margin: '2%' }}
          variant="contained"
          endIcon={<CompareArrowsIcon />}
          onClick={() => isDCFirst(!DCFirst)}
        >
          Flip
        </Button>{' '}
      </Card>
    </div>
  )
}
const DCToINR = (value) => {
  // 1 DC=100INR
  return value * EXCHANGE_RATE
}
const INRToDC = (value) => {
  // 1 INR=0.01
  return value / EXCHANGE_RATE
}
