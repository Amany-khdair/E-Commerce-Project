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
import CheckOut from './pages/checkOut/CheckOut';
import Products from './components/products/Products';
import AllProducts from './pages/products/AllProducts';
import Details from './pages/details/Details';
import ProtectedRouter from '../ProtectedRouter';
import ProductsByCat from './pages/products/ProductsByCat';
import Faqs from './pages/faqs/Faqs';
import ProfileLayout from './pages/profile/ProfileLayout';
import ProfileInfo from './pages/profile/ProfileInfo';
import ProfileOrders from './pages/profile/ProfileOrders';
import Settings from './pages/profile/Settings';
import ErrorPage from './pages/errorPage/ErrorPage';

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
          element: 
          <ProtectedRouter>
            <Wishlist/> 
          </ProtectedRouter>                       
        },
        {
          path: 'cart',
          element: 
          <ProtectedRouter>
            <Cart/>
          </ProtectedRouter>          
        },
        {
          path: 'profile',
          element: 
          <ProtectedRouter>
            <ProfileLayout/>
          </ProtectedRouter>,
          children:[
            {
              index: true,
              element: 
              <ProtectedRouter>
                <ProfileInfo/>
              </ProtectedRouter>              
            },{
              path: 'orders',
              element:
              <ProtectedRouter>
                <ProfileOrders/>
              </ProtectedRouter>              
            },{
              path: 'settings',
              element:
              <ProtectedRouter>
                <Settings/>
              </ProtectedRouter>
            }
          ]
        },
        {
          path: 'checkout',
          element: <CheckOut/>
        }, 
        {
          path: 'products',
          element: <Products/>
        },
        {
          path: 'allProducts',
          element: <AllProducts/>
        },
        {
          path: 'productsByCat/:id',
          element: <ProductsByCat/>
        },
        {
          path: 'details/:id',
          element: <Details/>
        },
        {
          path: 'faqs',
          element: <Faqs/>
        },
        {
          path: '*',
          element: <ErrorPage/>
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
