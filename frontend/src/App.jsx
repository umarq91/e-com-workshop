import React, { useEffect } from 'react';
import MainPage from './pages/MainPage';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SingleProduct from './pages/SingleProduct';
import NotFound from './pages/NotFound';
import Footer from './components/layout/Footer';
import CartPage from './pages/CartPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './pages/CheckOutPage';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import { fetchUserInfo } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoutes from './pages/ProtectedRoutes';
import SignUp from './pages/SignUpPage';
import { fetchCartAsync } from './features/cart/cartSlice';
import UserOrders from './pages/UserOrders';
import UserProfile from './pages/UserProfilepage';
import AdminProductDetailPage from './pages/admin/AdminProductDetailPage';
import AdminProductListPage from './pages/admin/AdminProductList';
import AdminProductForm from './pages/admin/AdminProductForm';
import ProtectedAdmin from './ProtectedAdmin';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userInfo);
  const loading = useSelector(state => state.auth.loading);
  const items = useSelector(state => state.cart.cart);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync());
    }
  }, [user, dispatch]);

  // Check if the current path is sign-in or sign-up
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div>
      <ToastContainer />
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/orders' element={<UserOrders />} />
        <Route path='/profile' element={<UserProfile />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminProductListPage />
            </ProtectedAdmin>
          }
        />
        <Route path="/admin/product-form" element={<AdminProductForm />} />
        <Route path="/admin/product-form/edit/:id" element={<AdminProductForm />} />
        <Route path="/admin/product/:id" element={<AdminProductDetailPage />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
