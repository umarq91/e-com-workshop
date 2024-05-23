// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    cart:[]
};

export const addToCartAsync = createAsyncThunk(
  'cart/addtoCart',
  async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/cart`,data);

      return response.data; // axios automatically parses JSON response
     
      return data
    } catch (error) {
      throw error;
    }
  }
);


// Define the thunk for fetching products from the API
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     try {
//       const response = await axios.get('https://fakestoreapi.com/products');
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// Create the product slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      
       const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
   
      if(existingProductIndex !== -1){
        state.cart[existingProductIndex].quantity += 1;  
      }else{
        state.cart.push(action.payload)
      }
    },
    removeCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCart(state, action) {
      const {quantity} = action.payload
      const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);

      if(existingProductIndex !== -1){
        state.cart[existingProductIndex].quantity = quantity;  
      }
      
    },
    emptyCart(state,action) {
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload.product)
        state.error = null;
      })

  },
});

// Export the actions and reducer
export const {addCart,removeCart,updateCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
