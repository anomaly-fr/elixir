import React from 'react'
import './TransactionCard.css'
import { Card, CardContent, Typography, Grid } from '@mui/material'

const TransactionCard = ({ transaction }) => {
  return (
    <div className="transaction-root">
      <Card className="transaction-card">
        <CardContent>
          <Grid container spacing={3}>
            <div>
              <h2>
                {Date(parseInt(transaction.timeStamp._hex)).substring(0, 24)}
              </h2>
              {/* <h2>{transaction.campaignID}</h2>
          <h2>{transaction.amount}</h2> */}
            </div>
          </Grid>
          {/* <h2>{parseInt(transaction.toAddress._hex)}</h2> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionCard
