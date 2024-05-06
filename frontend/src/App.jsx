import React from 'react'
import MainPage from './pages/MainPage'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SingleProduct from './pages/SingleProduct'
import NotFound from './pages/NotFound'
import Footer from './components/layout/Footer'
function App() {
  return (
    <div>

    <BrowserRouter>
    <Navbar/>
      <Routes>


      <Route path='/' element={<MainPage />}/>
      <Route path='/product/:id' element={<SingleProduct />}/>

      <Route path='/*' element={<NotFound/>} />



      </Routes>
      <Footer/>
    </BrowserRouter>

    </div>
  )
}

export default App