import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import Categories from '../../components/categories/Categories'
import Snowfall from 'react-snowfall'
export default function Home() {
  return (
    <>
      <Snowfall color='#82C3D9'/>
      <Categories/>
    </>
  )
}
