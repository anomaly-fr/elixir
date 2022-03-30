import React from 'react'
import './TransactionCard.css'
import { Card, CardContent, Typography, Grid } from '@mui/material'

const TransactionCard = ({ transaction }) => {
  console.log(transaction, 'transaction')
  return (
    <div className="transaction-root">
      <Card
        onClick={() => {
          console.log('Clicked', transaction.campaignID)
        }}
      >
        <Grid className="transaction-card" container spacing={3}>
          <h4>{Date(parseInt(transaction.timeStamp._hex)).substring(0, 24)}</h4>
          <h2>{transaction.campaignName}</h2>
          <h2>{transaction.toAddress.slice(0, 10)}...</h2>
          <h2>{parseInt(transaction.amount._hex)} LIT</h2>
        </Grid>
      </Card>
    </div>
  )
}

export default TransactionCard
