import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import TopBar from '../components/navbar/TopBar';

export default function MainLayout() {
  return (
    <>
        <TopBar />
        <Navbar/>
        <Container maxWidth= {"xl"}>
          <Outlet/>
        </Container>        
        <Footer/>
    </>
  )
}
