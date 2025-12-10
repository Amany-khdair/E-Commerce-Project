import React from 'react'
import { Outlet } from 'react-router-dom'
import RegisterNavbar from '../components/navbar/RegisterNavbar'

export default function AuthLayout() {
  return (
    <>
    <RegisterNavbar/>
    <Outlet/>

    <div className='footer'>
        this is auth footer
    </div>
    
    </>
  )
}
