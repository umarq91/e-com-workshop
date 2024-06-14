import React, { useEffect } from 'react'
import MainPage from './pages/MainPage'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SingleProduct from './pages/SingleProduct'
import NotFound from './pages/NotFound'
import Footer from './components/layout/Footer'
import CartPage from './pages/CartPage'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './pages/CheckOutPage'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { fetchUserInfo, login } from './features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoutes from './pages/ProtectedRoutes'
import SignUp from './pages/SignUpPage'
import { fetchCartAsync } from './features/cart/cartSlice'
import UserOrders from './pages/UserOrders'
import  UserProfile  from './pages/UserProfilepage'
axios.defaults.withCredentials=true 
function App() {

const dispatch=useDispatch()
const user=useSelector(state=>state.auth.userInfo)
const loading = useSelector((state) => state.auth.loading);
const items = useSelector((state) => state.cart.cart);


useEffect(()=>{
dispatch(fetchUserInfo())
},[])


useEffect(()=>{
  if(user){
    dispatch(fetchCartAsync())
  }
},[user])



  return (
    <div>

    <BrowserRouter>
    <ToastContainer />
    <Navbar/>
  

      <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/product/:id' element={<SingleProduct />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/checkout' element={<CheckOutPage />}/>
      <Route path='/sign-in' element={<LoginPage />}/>
      <Route path='/sign-up' element={<SignUp />}/>
      
      <Route path='/orders' element={<UserOrders />}/>
      <Route path="/profile" element={<UserProfile />}/>


      <Route path='/*' element={<NotFound/>} />
      </Routes>
    

  
      <Footer/>
    </BrowserRouter>

    </div>
  )
}

export default App