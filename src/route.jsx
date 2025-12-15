import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import Wishlist from './pages/wishlist/Wishlist';
import ForgetPassword from './pages/login/ForgetPassword';
import VerifyCode from './pages/login/VerifyCode';
import ResetPassword from './pages/login/ResetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        { index: true, 
          element: <Home /> 
        },
        {
          path: 'home',
          element: <Home/>
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'about',
          element: <About/>
        },
        {
          path: 'wishlist',
          element: <Wishlist/>            
        },
        {
          path: 'cart',
          element: <Cart/>
        }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'forgetPassword',
            element: <ForgetPassword/>
        },
        {
          path: 'verifyCode',
          element: <VerifyCode/>
        },
        {
          path: 'resetPassword',
          element: <ResetPassword/>
        },
        {
            path: 'register',
            element: <Register/>
        }
    ],
  },
]);

export default router;
