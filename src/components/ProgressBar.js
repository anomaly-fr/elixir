import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        backgroundColor: '#c9c5e5',

        padding: '5px',
        width: '100%',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          backgroundColor: '#231d50',
          width: `${progress}%`,
          padding: '5px',

          borderRadius: '10px',
        }}
      ></div>
    </div>
  )
}

export default ProgressBar
