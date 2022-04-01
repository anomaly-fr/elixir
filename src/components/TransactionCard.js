import React from 'react'
import './TransactionCard.css'
import { Card, CardContent, Typography, Grid } from '@mui/material'

const TransactionCard = ({ transaction }) => {
  const timeStamp = new Date(parseInt(transaction.timeStamp._hex))
  console.log(timeStamp)
  console.log(transaction, 'transaction')
  return (
    <div className="transaction-root">
      <Card
        onClick={() => {
          console.log('Clicked', transaction.campaignID)
        }}
      >
        <Grid className="transaction-card" item spacing={3}>
          {' '}
          <h5 style={{ flex: 2 }}>
            {timeStamp.getDate() +
              '/' +
              (timeStamp.getMonth() + 1) +
              '/' +
              timeStamp.getFullYear() +
              ' ' +
              timeStamp.getHours() +
              ':' +
              timeStamp.getMinutes() +
              ':' +
              timeStamp.getSeconds()}
          </h5>
          <h5
            style={{
              flex: 2,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >{`Campaign: ${transaction.campaignName}`}</h5>
          <h5 style={{ flex: 3 }}>
            {transaction.transactionType ? `From: ` : `Creator:`}
            {transaction.toOrFromAddress}
          </h5>
          <h5 style={{ flex: 1 }}>
            {`Amount: ${parseInt(transaction.amount._hex)}`} LIT
          </h5>{' '}
          <h5
            style={{
              color: transaction.transactionType ? 'aquamarine' : 'red',
            }}
          >
            {transaction.transactionType ? 'CREDIT' : 'DEBIT'}
          </h5>
        </Grid>
      </Card>
    </div>
  )
}

export default TransactionCard
