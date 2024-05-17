// store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/products/productSlice"
import cartReducer from "./features/cart/cartSlice"
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart:cartReducer,
    auth:authReducer
  },
});

export default store;
