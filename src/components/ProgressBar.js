import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        backgroundColor: '#EEF4F8',
        padding: '5px',
        width: '100%',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          backgroundColor: '#1976D2',
          width: `${progress}%`,
          padding: '5px',

          borderRadius: '10px',
        }}
      ></div>
    </div>
  )
}

export default ProgressBar
