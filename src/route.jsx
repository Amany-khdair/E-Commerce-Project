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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
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
            path: 'register',
            element: <Register/>
        }
    ],
  },
]);

export default router;
