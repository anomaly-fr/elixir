import React from 'react'
import logo from '../charity-blocks-logo.png'
import useWindowDimensions from './useWindowDimensions'

const Logo = () => {
  const { width, height } = useWindowDimensions()
  return <img src={logo} />
}
export default Logo
