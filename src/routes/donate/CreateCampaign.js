import React from 'react'
import './CreateCampaign.css'
import { Chip, TextField } from '@mui/material'
import { useState } from 'react'

const CreateCampaign = () => {
  const CategoryArray = () => {
    const [selected, setSelected] = useState()
    let categoryArray = [
      { index: 1, name: 'health' },
      { index: 2, name: 'refugees' },
      { index: 3, name: 'education' },
      { index: 4, name: 'hunger' },
      { index: 5, name: 'poverty' },
      { index: 6, name: 'nature' },
      { index: 7, name: 'other' },
    ]
    return (
      <>
        {categoryArray.map((category) => (
          <Chip
            style={{
              backgroundColor: selected === category.index ? 'purple' : 'gray',
            }}
            key={category.index}
            onClick={() => {
              setSelected(category.index)
            }}
            label={category.name}
          />
        ))}
      </>
    )
  }

  return (
    <div>
      <div className="form-root">
        <div className="form-row">
          <h3>Campaign Name</h3>
          <TextField placeholder="Campaign Name" type="text" />
        </div>
        <div className="form-row">
          <h3>Campaign Creator Name</h3>
          <TextField placeholder="Campaign Name" type="text" />
        </div>
        <div className="form-row">
          <h3>Category</h3>
          <CategoryArray />
        </div>
        <div className="form-row">
          <h3>About Campaign</h3>
          <TextField placeholder="Campaign Name" type="text" />
        </div>
      </div>
    </div>
  )
}

export default CreateCampaign
