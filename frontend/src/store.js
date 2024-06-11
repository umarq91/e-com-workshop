// store.js

import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/products/productSlice"
import cartReducer from "./features/cart/cartSlice"
import authReducer from './features/auth/authSlice';
import orderReducer from './features/order/orderSlice';


const store = configureStore({
  reducer: {
    products: productReducer,
    cart:cartReducer,
    auth:authReducer,
    orders:orderReducer
  },
});

export default store;
