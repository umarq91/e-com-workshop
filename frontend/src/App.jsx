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
import { login } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
import ProtectedRoutes from './pages/ProtectedRoutes'
axios.defaults.withCredentials=true 
function App() {
const dispatch=useDispatch()
useEffect(()=>{
  const getData=async()=>{
    
    const data = await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`)
    if(data.status==200){
      dispatch(login(data?.data))   
    }
  }
  getData()
},[])


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
      <Route path='/*' element={<NotFound/>} />
      </Routes>
    

  
      <Footer/>
    </BrowserRouter>

    </div>
  )
}

export default App