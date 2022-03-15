import React, { useEffect, useState } from 'react'
import './AppTopBar.css'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import MenuButton from './MenuButton'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import CampaignsAbi from '../CampaignsAbi.json'

const AppTopBar = ({ about, location }) => {
  const [contract, setContract] = useState()

  const [projects, setProjects] = useState([])
  const [example, setExample] = useState('Some Word')
  const getData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const campaignContract = new ethers.Contract(
      process.env.REACT_APP_CAMPAIGNS_CONTRACT_ADDRESS,
      CampaignsAbi,
      provider,
    )

    setContract(campaignContract)

    const numberOfProjects = await contract.numberOfCampaigns()

    const campaigns = []
    for (let i = 1; i <= numberOfProjects; i++) {
      campaigns.push(await contract.campaigns(i))
    }

    setProjects([...campaigns])
  }

  useEffect(() => {
    getData()
  }, [contract])

  return (
    <div className="App-top-bar">
      <div className="icon">
        <CardGiftcardIcon />
      </div>

      <div className="empty" />
      <div className="App-top-bar-menu">
        <Link className="link" to="/">
          <MenuButton title={'Home'} />
        </Link>
        <Link className="link" to="/projects">
          <MenuButton title={'Donate'} />
        </Link>
        <Link
          className="link"
          to={{
            pathname: '/projects/my-projects',
          }}
          state={projects}
        >
          <MenuButton title={'My Projects'} />
        </Link>
        <Link className="link" to="/login">
          <MenuButton title={'Connect Wallet'} />
        </Link>
        <Link className="link" to="/profile">
          <MenuButton title={'Me'} />
        </Link>
      </div>
    </div>
  )
}

export default AppTopBar
