import React from 'react'
import { Outlet } from 'react-router-dom'
import RegisterNavbar from '../components/navbar/RegisterNavbar'
import TopBar from '../components/navbar/TopBar'
import AuthFooter from '../components/footer/AuthFooter'

export default function AuthLayout() {
  return (
    <>
    <TopBar/>
    <RegisterNavbar/>
    <Outlet/>
    <AuthFooter/>   
    
    </>
  )
}
