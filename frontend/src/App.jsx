import React from 'react'
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
function App() {
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




      <Route path='/*' element={<NotFound/>} />



      </Routes>
      <Footer/>
    </BrowserRouter>

    </div>
  )
}

export default App