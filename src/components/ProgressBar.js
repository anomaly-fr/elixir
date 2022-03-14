import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div
      style={{
        backgroundColor: '#EEF4F8',
        padding: '5px',
        width: '30%',
        borderRadius: '10px',
      }}
    >
      <div
        style={{
          backgroundColor: '#1976D2',
          width: `${progress}%`,
          padding: '5px',
          borderBottomLeftRadius: '10px',
          borderTopLeftRadius: '10px',
        }}
      ></div>
    </div>
  )
}

export default ProgressBar
